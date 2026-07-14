'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';

export function Testimonials({ data }: { data: any }) {
  return (
    <section className="testimonials section section--tint" data-tina-field={tinaField(data)}>
      <div className="container title-center">
        {data.eyebrow && (
          <p className="eyebrow eyebrow--center" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        <ul className="testimonials__grid" style={{ textAlign: 'left' }}>
          {data.items?.map((t: any, i: number) => (
            <li key={i} className="testimonials__card" data-tina-field={tinaField(t)}>
              {typeof t.rating === 'number' && t.rating > 0 && (
                <div className="testimonials__rating" aria-label={`Note : ${t.rating} sur 5`} data-tina-field={tinaField(t, 'rating')}>
                  {'★'.repeat(Math.min(5, Math.max(1, t.rating)))}
                </div>
              )}
              <blockquote data-tina-field={tinaField(t, 'quote')}>{t.quote}</blockquote>
              <div className="testimonials__author">
                <strong data-tina-field={tinaField(t, 'authorName')}>{t.authorName}</strong>
                {t.authorRole && (
                  <span className="testimonials__role" data-tina-field={tinaField(t, 'authorRole')}>{t.authorRole}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const testimonialsBlockSchema: Template = {
  name: 'testimonials',
  label: 'Section Témoignages',
  ui: {
    defaultItem: { eyebrow: 'Ils ont pris la route', title: 'Vos plus beaux souvenirs' },
  },
  fields: [
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre', required: true },
    {
      name: 'items',
      type: 'object',
      label: 'Témoignages',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.authorName || 'Témoignage' }),
        defaultItem: {
          quote: 'Une expérience inoubliable du début à la fin.',
          authorName: 'Prénom N.',
          rating: 5,
        },
      },
      fields: [
        {
          name: 'quote',
          type: 'string',
          label: 'Citation',
          required: true,
          ui: { component: 'textarea' },
        },
        { name: 'authorName', type: 'string', label: 'Nom du client', required: true },
        { name: 'authorRole', type: 'string', label: 'Contexte (optionnel)', description: 'Ex. « Mariage à Biarritz » ou « Rallye entreprise ».' },
        {
          name: 'rating',
          type: 'number',
          label: 'Note (1 à 5)',
          description: 'Entre 1 et 5 étoiles.',
          ui: {
            validate: (v?: number) => {
              if (v != null && (v < 1 || v > 5)) return 'Entre 1 et 5.';
            },
          },
        },
      ],
    },
    ...titleAppearanceFields,
  ],
};
