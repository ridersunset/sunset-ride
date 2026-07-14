'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPath } from './locale';

const T = {
  en: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    sending: 'Sending…',
    ok: 'Thank you — your message has been sent. We will get back to you very soon.',
    error: 'Something went wrong. Please try again or write to us directly.',
  },
  fr: {
    name: 'Nom',
    email: 'Email',
    message: 'Message',
    send: 'Envoyer',
    sending: 'Envoi…',
    ok: 'Merci — votre message a bien été envoyé. Nous revenons vers vous très vite.',
    error: 'Une erreur est survenue. Réessayez ou écrivez-nous directement.',
  },
};

// Formulaire FIXE nom / email / message — aucune configuration exposée au client.
export function ContactForm({ to }: { to: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const pathname = usePathname();
  const t = T[localeFromPath(pathname)];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to,
          name: fd.get('name'),
          email: fd.get('email'),
          message: fd.get('message'),
        }),
      });
      setState(res.ok ? 'ok' : 'error');
      if (res.ok) form.reset();
    } catch {
      setState('error');
    }
  }

  if (state === 'ok') {
    return <p className="contact__ok">{t.ok}</p>;
  }

  return (
    <form className="contact__form" onSubmit={onSubmit}>
      <label>
        {t.name}
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        {t.email}
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        {t.message}
        <textarea name="message" required rows={6} />
      </label>
      <button className="cta-link" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? t.sending : t.send}
      </button>
      {state === 'error' && <p className="contact__err">{t.error}</p>}
    </form>
  );
}
