'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { ContactForm } from '../ContactForm';

export function Contact({ data }: { data: any }) {
  return (
    <section className="contact section" data-tina-field={tinaField(data)} id="contact">
      <div className="container">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        {data.intro && (
          <p className="section-intro" data-tina-field={tinaField(data, 'intro')}>{data.intro}</p>
        )}
        <div className="contact__grid">
          <div>
            <ul className="contact__list">
              <li>
                <span className="contact__label">Email</span>
                <a className="contact__value" href={`mailto:${data.email}`} data-tina-field={tinaField(data, 'email')}>
                  {data.email}
                </a>
              </li>
              {data.phone && (
                <li>
                  <span className="contact__label">Téléphone / WhatsApp</span>
                  <a className="contact__value" href={`tel:${(data.phone || '').replace(/\s/g, '')}`} data-tina-field={tinaField(data, 'phone')}>
                    {data.phone}
                  </a>
                </li>
              )}
              {data.hours && (
                <li>
                  <span className="contact__label">Horaires</span>
                  <span className="contact__value" data-tina-field={tinaField(data, 'hours')}>{data.hours}</span>
                </li>
              )}
              {data.locations?.length > 0 && (
                <li>
                  <span className="contact__label">Adresses</span>
                  <div className="contact__locations">
                    {data.locations.map((loc: any, i: number) => (
                      <address key={i} style={{ fontStyle: 'normal' }} data-tina-field={tinaField(loc)}>
                        <strong data-tina-field={tinaField(loc, 'city')}>{loc.city}</strong>
                        <br />
                        <span style={{ color: 'var(--muted)' }} data-tina-field={tinaField(loc, 'address')}>{loc.address}</span>
                      </address>
                    ))}
                  </div>
                </li>
              )}
            </ul>
            {data.mapEmbed && (
              <iframe
                className="contact__map"
                src={data.mapEmbed}
                title="Carte"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ marginTop: '2.5rem' }}
                data-tina-field={tinaField(data, 'mapEmbed')}
              />
            )}
          </div>
          {data.showForm && <ContactForm to={data.email} />}
        </div>
      </div>
    </section>
  );
}

export const contactBlockSchema: Template = {
  name: 'contact',
  label: 'Section Contact',
  ui: {
    defaultItem: {
      eyebrow: 'Contact',
      title: 'Parlons de votre projet',
      email: 'paul.sunsetride@gmail.com',
      phone: '+33 6 38 77 69 36',
      hours: 'Lundi – Dimanche · 9h – 19h',
      showForm: true,
    },
  },
  fields: [
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre', required: true },
    { name: 'intro', type: 'string', label: 'Introduction (optionnel)', ui: { component: 'textarea' } },
    { name: 'email', type: 'string', label: 'Email de contact', required: true },
    { name: 'phone', type: 'string', label: 'Téléphone' },
    { name: 'hours', type: 'string', label: 'Horaires' },
    {
      name: 'locations',
      type: 'object',
      label: 'Adresses',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.city || 'Adresse' }),
        defaultItem: { city: 'Nice', address: '48 Route de Canta Galet, 06200 Nice' },
      },
      fields: [
        { name: 'city', type: 'string', label: 'Ville', required: true },
        { name: 'address', type: 'string', label: 'Adresse', required: true },
      ],
    },
    {
      name: 'mapEmbed',
      type: 'string',
      label: 'Carte Google Maps (optionnel)',
      description:
        'Lien d’intégration UNIQUEMENT : Google Maps → Partager → Intégrer une carte → copiez l’adresse qui commence par https://www.google.com/maps/embed',
      ui: {
        validate: (v?: string) => {
          if (v && !v.startsWith('https://www.google.com/maps/embed')) {
            return 'Le lien doit commencer par https://www.google.com/maps/embed';
          }
        },
      },
    },
    {
      name: 'showForm',
      type: 'boolean',
      label: 'Afficher le formulaire de contact',
      description: 'Formulaire fixe (nom, email, message). Aucune configuration risquée.',
    },
    ...titleAppearanceFields,
  ],
};
