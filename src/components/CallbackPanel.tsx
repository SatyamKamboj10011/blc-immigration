import { FormEvent, useState } from 'react';
import Icon from './Icon';
import Button from './Button';
import { submitEnquiry } from '../lib/submitEnquiry';

export default function CallbackPanel() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !/^[0-9+()\-\s]{7,15}$/.test(phone)) {
      setError('Please enter your name and a valid phone number.');
      return;
    }
    setError('');
    setStatus('submitting');
    await submitEnquiry({
      source: 'Call Back Request',
      name,
      phone,
      email: '',
      interestedIn: 'Call back request',
      message: 'Requested a call back.',
    });
    setStatus('success');
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring fixed bottom-24 right-5 z-40 hidden items-center gap-2 rounded-sm bg-brand-800 px-4 py-3 text-sm font-semibold text-paper shadow-lg transition-colors hover:bg-brand-900 sm:flex"
      >
        <Icon name="phone" className="h-4 w-4" />
        Request a Call Back
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label="Request a call back">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-sm rounded-t-xl2 border border-brand-900/10 bg-white p-6 shadow-card-hover sm:rounded-xl2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="focus-ring absolute right-4 top-4 text-brand-800/60 hover:text-brand-800"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-brand-800 text-white">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-semibold text-brand-950">We'll call you back shortly.</h3>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setOpen(false);
                    setStatus('idle');
                    setName('');
                    setPhone('');
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <h3 className="font-display text-lg font-semibold text-brand-950">Request a Call Back</h3>
                <p className="text-sm text-brand-800/70">Leave your name and number — the BLC team will call you back.</p>
                {error && <p className="text-xs font-medium text-red-600">{error}</p>}
                <div>
                  <label htmlFor="cb-name" className="mb-1.5 block text-sm font-semibold text-brand-900">Full Name</label>
                  <input
                    id="cb-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus-ring w-full rounded-md border border-brand-200 bg-white px-4 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cb-phone" className="mb-1.5 block text-sm font-semibold text-brand-900">Phone</label>
                  <input
                    id="cb-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus-ring w-full rounded-md border border-brand-200 bg-white px-4 py-2.5 text-sm"
                  />
                </div>
                <Button type="submit" className="w-full">
                  {status === 'submitting' ? 'Sending…' : 'Request Call Back'}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
