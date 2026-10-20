import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { siteInfo } from '../data/site';
import { chatCopy, knowledge, starterIds, type KnowledgeEntry } from '../lib/knowledge';
import { localise, useSemanticSearch } from '../lib/useSemanticSearch';
import { useLanguage, type Dictionary, type Lang } from '../i18n';

// Bot messages store *what* to say plus the language to say it in, and are
// rendered through the dictionaries — so they stay correct if the dictionary
// loads a moment later.
type Message =
  | { from: 'user'; text: string }
  | { from: 'bot'; lang: Lang; entry?: KnowledgeEntry; copy?: 'greeting' | 'suggest' | 'unsure'; suggestions?: KnowledgeEntry[] };

const starters = starterIds.map((id) => knowledge.find((k) => k.id === id)!).filter(Boolean);

export default function ChatWidget() {
  const { t, lang, dict: uiDict } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { status, progress, load, search, dicts } = useSemanticSearch();

  const dictFor = (l: Lang): Dictionary => (l === 'en' ? {} : dicts?.[l] ?? (l === lang ? uiDict : {}));

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, thinking]);

  function answerWith(entry: KnowledgeEntry, replyLang: Lang = lang) {
    const { question } = localise(entry, dictFor(replyLang));
    setMessages((prev) => [...prev, { from: 'user', text: question }, { from: 'bot', lang: replyLang, entry }]);
  }

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setThinking(true);
    const { result, script } = await search(text);
    setThinking(false);
    // answer in the script the student typed in; Latin script follows the site language
    const replyLang: Lang = script === 'latin' ? lang : script;

    let reply: Message;
    if (result.kind === 'answer') {
      reply = { from: 'bot', lang: replyLang, entry: result.entry, suggestions: result.related ? [result.related] : undefined };
    } else if (result.kind === 'suggest') {
      reply = { from: 'bot', lang: replyLang, copy: 'suggest', suggestions: result.options };
    } else {
      reply = { from: 'bot', lang: replyLang, copy: 'unsure' };
    }
    setMessages((prev) => [...prev, reply]);
  }

  const shown: Message[] = [{ from: 'bot', lang, copy: 'greeting' }, ...messages];
  const asked = messages.length > 0;

  function renderBot(m: Extract<Message, { from: 'bot' }>) {
    const d = dictFor(m.lang);
    const tr = (s: string) => d[s] ?? s;
    if (m.entry) return localise(m.entry, d);
    return {
      answer: tr(chatCopy[m.copy!]),
      link: m.copy === 'unsure' ? { to: '/contact', label: tr(chatCopy.unsureLink) } : undefined,
    };
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t('Close quick help') : t('Open quick help')}
        aria-expanded={open}
        className="focus-ring fixed bottom-4 right-20 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-950 text-gold-500 shadow-lg ring-2 ring-white/20 transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-24 sm:h-14 sm:w-14"
      >
        <Icon name={open ? 'close' : 'chat'} className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t('BLC quick help')}
          className="fixed bottom-20 right-4 z-40 flex h-[32rem] max-h-[80vh] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl2 border border-brand-900/10 bg-white shadow-card-hover sm:bottom-24 sm:right-5"
        >
          <div className="flex items-center justify-between bg-brand-950 px-4 py-3">
            <div>
              <p className="font-display text-sm font-semibold tracking-[-0.03em] text-white">{t('BLC Quick Help')}</p>
              <p className="text-xs text-brand-200">
                {status === 'loading'
                  ? t('Loading on-device AI… {percent}%', { percent: Math.round(progress) })
                  : status === 'ready'
                    ? t('On-device AI · answers from BLC’s own info')
                    : t('Guided answers — not a live agent')}
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label={t('Close')} className="focus-ring text-brand-200 hover:text-white">
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4" data-lenis-prevent>
            <div className="flex flex-col gap-3" aria-live="polite">
              {shown.map((m, i) => {
                if (m.from === 'user') {
                  return (
                    <div key={i} className="max-w-[88%] self-end rounded-2xl bg-brand-950 px-3.5 py-2.5 text-sm leading-relaxed text-white">
                      {m.text}
                    </div>
                  );
                }
                const { answer, link } = renderBot(m);
                return (
                  <div key={i} lang={m.lang} className="flex max-w-[88%] flex-col gap-2 self-start">
                    <div className="rounded-2xl bg-paper-dim px-3.5 py-2.5 text-sm leading-relaxed text-brand-900">
                      {answer}
                      {link && (
                        <Link
                          to={link.to}
                          onClick={() => setOpen(false)}
                          className="focus-ring mt-2 flex w-fit items-center gap-1 rounded text-xs font-semibold text-brand-700 underline-offset-2 hover:underline"
                        >
                          {link.label}
                          <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
                        </Link>
                      )}
                    </div>
                    {m.suggestions?.map((sug) => (
                      <button
                        key={sug.id}
                        type="button"
                        onClick={() => answerWith(sug, m.lang)}
                        className="focus-ring w-fit rounded-full border border-brand-900/15 px-3 py-1.5 text-left text-xs font-semibold text-brand-800 transition-colors hover:border-brand-700"
                      >
                        {localise(sug, dictFor(m.lang)).question}
                      </button>
                    ))}
                  </div>
                );
              })}
              {thinking && (
                <div className="flex gap-1 self-start rounded-2xl bg-paper-dim px-3.5 py-3" aria-label={t('Thinking')}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-700" style={{ animationDelay: `${d * 120}ms` }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-brand-900/10 p-3">
            {!asked ? (
              <div className="flex flex-wrap gap-1.5">
                {starters.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => answerWith(s)}
                    className="focus-ring rounded-full border border-brand-900/15 px-3 py-1.5 text-left text-xs font-semibold text-brand-800 transition-colors hover:border-brand-700"
                  >
                    {t(s.questions[0])}
                  </button>
                ))}
              </div>
            ) : (
              <button type="button" onClick={() => setMessages([])} className="focus-ring w-fit text-xs font-semibold text-brand-700 hover:underline">
                {t('Start over')}
              </button>
            )}
            <form
              onSubmit={ask}
              className="flex items-center gap-2 rounded-full border border-brand-900/15 bg-white py-1 pl-4 pr-1 focus-within:border-brand-700"
            >
              <label htmlFor="quick-help-input" className="sr-only">{t('Type your question')}</label>
              <input
                id="quick-help-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('Type your question…')}
                maxLength={200}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent py-1.5 text-sm text-brand-950 outline-none placeholder:text-brand-900/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking}
                aria-label={t('Send question')}
                className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-950 text-white transition-opacity disabled:opacity-30"
              >
                <Icon name="arrow" className="h-4 w-4 -rotate-90" />
              </button>
            </form>
            <div className="flex gap-2 pt-1">
              <a
                href={`https://wa.me/${siteInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"
              >
                <Icon name="chat" className="h-3.5 w-3.5" />
                {t('WhatsApp Us')}
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold-500 px-3 py-2 text-xs font-bold text-brand-950"
              >
                {t('Book Consultation')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
