import { FormEvent, useState } from 'react';
import { submitEnquiry } from '../lib/submitEnquiry';
import Button from './Button';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailPattern.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    const result = await submitEnquiry({
      source: 'Newsletter Subscription',
      name: '',
      email,
      phone: '',
      interestedIn: 'Newsletter',
      message: 'Subscribed for study abroad updates and scholarship alerts.',
    });
    setStatus(result.ok ? 'success' : 'error');
  }

  return (
    <section className="relative overflow-hidden bg-brand-700">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-500/15"
        aria-hidden="true"
      />
      <div className="container-page relative flex flex-col items-center gap-5 py-16 text-center sm:py-20">
        <p className="eyebrow text-gold-400">We respect your privacy — no spam, ever.</p>
        <h2 className="max-w-2xl font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
          Get the Latest Study Abroad Updates &amp; Scholarships in Your Inbox!
        </h2>
        <p className="max-w-xl text-base text-brand-100">
          Join students who receive free monthly insights, visa tips and scholarship alerts.
        </p>

        {status === 'success' ? (
          <p className="rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white">
            Thanks — you're subscribed. Watch your inbox for updates.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row" noValidate>
            <label className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring w-full rounded-full border-2 border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/60"
              />
            </label>
            <Button type="submit" variant="accent" className="shrink-0">
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </Button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-xs font-medium text-gold-300">Please enter a valid email address.</p>
        )}
      </div>
    </section>
  );
}
