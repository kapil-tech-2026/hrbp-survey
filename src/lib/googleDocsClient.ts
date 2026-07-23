export const GOOGLE_DOC_WEBAPP_URL = 
  process.env.NEXT_PUBLIC_GOOGLE_DOC_URL || 
  'https://script.google.com/macros/s/AKfycbzbOYTtbPv3qO5l_ULnKUwaORTprTZjmc8gsDJR1q7F-loGtQ5M5KfnKZRKlKiXP-TeXg/exec';

export const saveToGoogleDoc = async (payload: Record<string, any>) => {
  // mode: 'no-cors' sends the payload smoothly across origins without preflight blocks.
  const response = await fetch(GOOGLE_DOC_WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8', 
    },
    body: JSON.stringify(payload),
  });

  // Do NOT call response.json() here because no-cors returns an opaque (unreadable) response body.
  return response;
};