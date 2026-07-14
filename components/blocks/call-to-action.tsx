'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField, linkField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { CtaLink } from '../CtaLink';

function renderTitle(title?: string | null, accentWord?: string | null) {
  if (!title) return null;
  if (accentWord && title.includes(accentWord)) {
    const idx = title.indexOf(accentWord);
    return (
      <>
        {title.slice(0, idx)}
        <em>{accentWord}</em>
        {title.slice(idx + accentWord.length)}
      </>
    );
  }
  return title;
}

export function CallToAction({ data }: { data: any }) {
  return (
    <section className="cta" data-bg={data.background || 'dark'} data-tina-field={tinaField(data)}>
      {data.background === 'image' && data.bgImage?.src && (
        <>
          <div className="cta__media" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.bgImage.src} alt="" loading="lazy" data-tina-field={tinaField(data, 'bgImage')} />
          </div>
          <div className="cta__scrim" aria-hidden="true" />
        </>
      )}
      <div className="cta__inner">
        <h2 className="cta__title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {renderTitle(data.title, data.accentWord)}
        </h2>
        {data.subtitle && (
          <p className="cta__subtitle" data-tina-field={tinaField(data, 'subtitle')}>{data.subtitle}</p>
        )}
        {data.button?.href && <CtaLink {...data.button} tinaField={tinaField(data, 'button')} />}
      </div>
    </section>
  );
}

export const ctaBlockSchema: Template = {
  name: 'cta',
  label: 'Section Appel à l’action',
  ui: {
    defaultItem: {
      background: 'dark',
      title: 'Votre légende vous attend',
      subtitle: 'Réservez votre voiture de collection en quelques minutes.',
      button: { label: 'Réserver', href: '/contact' },
    },
  },
  fields: [
    { name: 'title', type: 'string', label: 'Titre', required: true },
    {
      name: 'accentWord',
      type: 'string',
      label: 'Mot accentué (optionnel)',
      description: 'Un mot du titre à mettre en italique doré. Recopiez-le exactement.',
    },
    { name: 'subtitle', type: 'string', label: 'Sous-titre (optionnel)', ui: { component: 'textarea' } },
    {
      name: 'background',
      type: 'string',
      label: 'Fond',
      required: true,
      options: [
        { value: 'accent', label: 'Couleur d’accent (or)' },
        { value: 'dark', label: 'Encre (sombre)' },
        { value: 'image', label: 'Photo' },
      ],
    },
    // Sous-champs requis comme le bgImage du Héro (même nullabilité — piège GraphQL §10.2) ;
    // l'objet lui-même reste optionnel (utile seulement si fond « Photo »).
    imageField('bgImage', 'Photo de fond (si fond « Photo »)'),
    linkField('button', 'Bouton'),
    ...titleAppearanceFields,
  ],
};
