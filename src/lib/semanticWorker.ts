/// <reference lib="webworker" />
// Runs a ~23 MB sentence-embedding model (all-MiniLM-L6-v2) entirely in the
// visitor's browser, off the main thread. No server, no API key, no cost —
// the model is downloaded once from the Hugging Face CDN and cached by the browser.
import { pipeline, type FeatureExtractionPipeline } from '@huggingface/transformers';

const MODEL = 'Xenova/all-MiniLM-L6-v2';

// pipeline()'s overloads are too large for TypeScript to resolve here, so pin the one we use
const createExtractor = pipeline as unknown as (
  task: 'feature-extraction',
  model: string,
  options: Record<string, unknown>,
) => Promise<FeatureExtractionPipeline>;

type InMessage =
  | { type: 'init'; phrasings: string[] }
  | { type: 'query'; id: number; text: string };

let extractor: FeatureExtractionPipeline | null = null;
let index: Float32Array[] = [];

async function embed(texts: string[]): Promise<Float32Array[]> {
  const output = await extractor!(texts, { pooling: 'mean', normalize: true });
  const dim = output.dims[1];
  const data = output.data as Float32Array;
  return texts.map((_, i) => data.slice(i * dim, (i + 1) * dim));
}

// vectors are normalised, so the dot product is the cosine similarity
function dot(a: Float32Array, b: Float32Array) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

self.onmessage = async (event: MessageEvent<InMessage>) => {
  const msg = event.data;
  try {
    if (msg.type === 'init') {
      extractor = await createExtractor('feature-extraction', MODEL, {
        dtype: 'q8',
        progress_callback: (p: { status: string; progress?: number }) => {
          if (p.status === 'progress' && typeof p.progress === 'number') {
            self.postMessage({ type: 'progress', progress: p.progress });
          }
        },
      });
      index = await embed(msg.phrasings);
      self.postMessage({ type: 'ready' });
    } else if (msg.type === 'query') {
      const [q] = await embed([msg.text]);
      const scores = index.map((v) => dot(q, v));
      self.postMessage({ type: 'result', id: msg.id, scores });
    }
  } catch (error) {
    self.postMessage({ type: 'error', message: error instanceof Error ? error.message : String(error) });
  }
};
