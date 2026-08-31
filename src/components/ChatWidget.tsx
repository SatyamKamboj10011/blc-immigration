import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { services, destinations, serviceFeatures, siteInfo, officeHours } from '../data/site';

interface Topic {
  id: string;
  question: string;
  answer: string;
}

const pteVsIelts = services.find((s) => s.slug === 'pte')?.faqs.find((f) => f.q.includes('different'))?.a ?? '';

const topics: Topic[] = [
  {
    id: 'services',
    question: 'What services do you offer?',
    answer: `We help with: ${services.map((s) => s.shortTitle).join(', ')}. Every service starts with a free initial consultation.`,
  },
  {
    id: 'destinations',
    question: 'Which countries can I study in?',
    answer: `We currently guide students towards ${destinations.map((d) => d.name).join(', ')}. Tap "Study Abroad" in the menu to see country-specific details.`,
  },
  {
    id: 'ielts-pte',
    question: "IELTS vs PTE — what's the difference?",
    answer: pteVsIelts,
  },
  {
    id: 'included',
    question: "What's included in a consultation?",
    answer: `Your first consultation is free. It typically covers: ${serviceFeatures.slice(0, 3).map((f) => f.title.toLowerCase()).join(', ')}, and more.`,
  },
  {
    id: 'location',
    question: 'Where are you located and what are your hours?',
    answer: `${siteInfo.addressLine}. Hours: ${officeHours.map((h) => `${h.day} — ${h.hours}`).join('; ')}.`,
  },
];

type Message =
  | { from: 'bot'; text: string }
  | { from: 'user'; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: "Hi! I'm BLC's quick-help guide. Pick a question below, or reach a real person on WhatsApp any time." },
  ]);
  const [askedIds, setAskedIds] = useState<string[]>([]);

  const remainingTopics = topics.filter((t) => !askedIds.includes(t.id));

  function askTopic(topic: Topic) {
    setMessages((prev) => [...prev, { from: 'user', text: topic.question }, { from: 'bot', text: topic.answer }]);
    setAskedIds((prev) => [...prev, topic.id]);
  }

  function reset() {
    setMessages([{ from: 'bot', text: "Hi! I'm BLC's quick-help guide. Pick a question below, or reach a real person on WhatsApp any time." }]);
    setAskedIds([]);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close quick help' : 'Open quick help'}
        aria-expanded={open}
        className="focus-ring fixed bottom-4 right-20 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-950 text-gold-500 shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95 sm:bottom-5 sm:right-24 sm:h-14 sm:w-14"
      >
        <Icon name={open ? 'close' : 'chat'} className="h-6 w-6" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="BLC quick help"
          className="fixed bottom-20 right-4 z-40 flex h-[28rem] w-[92vw] max-w-sm flex-col overflow-hidden rounded-xl2 border border-brand-900/10 bg-white shadow-card-hover sm:bottom-24 sm:right-5"
        >
          <div className="flex items-center justify-between bg-brand-950 px-4 py-3">
            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-tight text-white">BLC Quick Help</p>
              <p className="text-xs text-brand-200">Guided answers — not a live agent</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="focus-ring text-brand-200 hover:text-white"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-xl2 px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.from === 'bot'
                      ? 'self-start bg-paper-dim text-brand-900'
                      : 'self-end bg-brand-950 text-white'
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 border-t border-brand-900/10 p-3">
            {remainingTopics.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {remainingTopics.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => askTopic(t)}
                    className="focus-ring rounded-full border border-brand-900/15 px-3 py-1.5 text-left text-xs font-semibold text-brand-800 transition-colors hover:border-gold-500 hover:text-gold-700"
                  >
                    {t.question}
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={reset}
                className="focus-ring rounded-full border border-brand-900/15 px-3 py-1.5 text-xs font-semibold text-brand-800 hover:border-gold-500 hover:text-gold-700"
              >
                Ask another question
              </button>
            )}
            <div className="flex gap-2 pt-1">
              <a
                href={`https://wa.me/${siteInfo.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"
              >
                <Icon name="chat" className="h-3.5 w-3.5" />
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="focus-ring flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gold-500 px-3 py-2 text-xs font-bold text-brand-950"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
