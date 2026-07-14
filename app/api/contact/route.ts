import { NextResponse } from 'next/server';

// Envoi du formulaire de contact.
// Brancher RESEND_API_KEY (+ CONTACT_FROM vérifié chez Resend) en production ;
// sans clé, la route accepte la requête (utile en préversion) sans envoyer.
export async function POST(req: Request) {
  const { to, name, email, message } = await req.json();
  if (!to || !name || !email || !message) {
    return NextResponse.json({ error: 'Champs manquants.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || 'site@sunset-ride.com',
        to,
        reply_to: email,
        subject: `Demande via le site — ${name}`,
        text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 });
    }
  } else {
    console.warn('[contact] RESEND_API_KEY absente — message non envoyé (préversion).');
  }

  return NextResponse.json({ ok: true });
}
