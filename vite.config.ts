import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// transformers.js references its ~21 MB ONNX WebAssembly runtime, so Vite copies it
// into the build — but at runtime the library loads that file from the jsDelivr CDN
// instead. Drop the unused copy to keep deployments small.
function dropUnusedOnnxWasm(): Plugin {
  return {
    name: 'drop-unused-onnx-wasm',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const file of Object.keys(bundle)) {
        if (/ort-wasm.*\.wasm$/.test(file)) delete bundle[file];
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), dropUnusedOnnxWasm()],
  worker: { format: 'es', plugins: () => [dropUnusedOnnxWasm()] },
});
