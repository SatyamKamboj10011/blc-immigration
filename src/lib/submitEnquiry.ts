export type EnquirySource = 'Contact Form' | 'Call Back Request' | 'Newsletter Subscription';

export interface EnquiryPayload {
  source: EnquirySource;
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  message: string;
}

// Google Sheets (via Apps Script web app) — free, no submission caps, no
// backend to maintain. Set VITE_GSHEET_WEBHOOK_URL in a .env file to go live.
// See README.md for the one-time setup steps. Without it, submissions are
// logged to the console only, so the form still works end-to-end in dev.
const GSHEET_WEBHOOK_URL = import.meta.env.VITE_GSHEET_WEBHOOK_URL as string | undefined;

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean }> {
  if (!GSHEET_WEBHOOK_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // eslint-disable-next-line no-console
    console.info('[submitEnquiry] No VITE_GSHEET_WEBHOOK_URL configured — logging only:', payload);
    return { ok: true };
  }

  try {
    // Apps Script web apps don't return CORS headers for cross-origin fetch,
    // so the response body/status can't be read from the browser. We send
    // the request and treat "didn't throw" as success (fire-and-forget).
    await fetch(GSHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        source: payload.source,
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        interestedIn: payload.interestedIn,
        message: payload.message,
      }),
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}
