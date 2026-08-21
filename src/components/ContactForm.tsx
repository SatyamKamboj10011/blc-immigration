import { FormEvent, useState } from 'react';
import { services } from '../data/site';
import { submitEnquiry } from '../lib/submitEnquiry';
import Button from './Button';

interface FormState {
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  interestedIn: '',
  message: '',
};

type Errors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+()\-\s]{7,15}$/;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function validate(values: FormState): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!values.email.trim()) next.email = 'Please enter your email address.';
    else if (!emailPattern.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Please enter your phone number.';
    else if (!phonePattern.test(values.phone)) next.phone = 'Please enter a valid phone number.';
    if (!values.interestedIn) next.interestedIn = 'Please select what you are interested in.';
    if (!values.message.trim()) next.message = 'Please add a short message.';
    else if (values.message.trim().length < 10) next.message = 'Please provide a little more detail (10+ characters).';
    return next;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');
    try {
      const result = await submitEnquiry(form);
      if (!result.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm(initialState);
    } catch {
      setStatus('error');
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  const inputClasses =
    'focus-ring w-full rounded-md border border-brand-200 bg-white px-4 py-3 text-sm text-brand-950 placeholder:text-brand-800/40';

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl2 border border-brand-200 bg-brand-50 p-8 text-center">
        <h3 className="text-xl font-bold text-brand-900">Thank you — your enquiry has been sent.</h3>
        <p className="mt-2 text-sm text-brand-800/80">A member of the BLC team will get back to you shortly.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setStatus('idle')}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      {status === 'error' && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your enquiry. Please try again, or contact us directly by phone or email.
        </div>
      )}
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-brand-900">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={inputClasses}
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <p id="name-error" className="mt-1 text-xs font-medium text-red-600">{errors.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-brand-900">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputClasses}
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && <p id="email-error" className="mt-1 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-brand-900">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
            value={form.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && <p id="phone-error" className="mt-1 text-xs font-medium text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="interestedIn" className="mb-1.5 block text-sm font-semibold text-brand-900">
          Interested In
        </label>
        <select
          id="interestedIn"
          name="interestedIn"
          className={inputClasses}
          value={form.interestedIn}
          onChange={(e) => handleChange('interestedIn', e.target.value)}
          aria-invalid={!!errors.interestedIn}
          aria-describedby={errors.interestedIn ? 'interestedIn-error' : undefined}
        >
          <option value="">Select an option</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
          <option value="Study Abroad">Study Abroad</option>
          <option value="Other">Other</option>
        </select>
        {errors.interestedIn && (
          <p id="interestedIn-error" className="mt-1 text-xs font-medium text-red-600">{errors.interestedIn}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-brand-900">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClasses}
          value={form.message}
          onChange={(e) => handleChange('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && <p id="message-error" className="mt-1 text-xs font-medium text-red-600">{errors.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-fit">
        {status === 'submitting' ? 'Sending…' : 'Send Enquiry'}
      </Button>
    </form>
  );
}
