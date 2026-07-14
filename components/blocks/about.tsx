'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

// Split éditorial : l'image file jusqu'au bord du site (fond perdu) et occupe
// toute la hauteur du bloc texte (alignée haut/bas avec lui).
export function About({ data }: { data: any }) {
  return (
    <section className="about section" data-variant={data.variant || 'media-left'} data-tina-field={tinaField(data)}>
      <div className="about__grid">
        <figure className="about__media">
          <div className="about__media-frame">
            {data.image?.src && (
              <Media image={data.image} fill sizes="(max-width: 900px) 100vw, 50vw" tinaField={tinaField(data, 'image')} />
            )}
          </div>
          {data.imageCaption && (
            <figcaption data-tina-field={tinaField(data, 'imageCaption')}>{data.imageCaption}</figcaption>
          )}
        </figure>
        <div className="about__text">
          {data.eyebrow && (
            <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
          )}
          <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
            {data.title}
          </h2>
          {data.body && (
            <p className="about__body" data-tina-field={tinaField(data, 'body')}>{data.body}</p>
          )}
          {data.stats?.length > 0 && (
            <ul className="about__stats">
              {data.stats.map((s: any, i: number) => (
                <li key={i} data-tina-field={tinaField(s)}>
                  <span className="about__stat-value" data-tina-field={tinaField(s, 'value')}>{s.value}</span>
                  <span className="about__stat-label" data-tina-field={tinaField(s, 'label')}>{s.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export const aboutBlockSchema: Template = {
  name: 'about',
  label: 'Section À propos',
  ui: {
    defaultItem: {
      variant: 'media-left',
      eyebrow: 'Notre histoire',
      title: 'Une passion devenue maison',
      body: 'Racontez ici votre histoire en quelques phrases.',
    },
  },
  fields: [
    {
      name: 'variant',
      type: 'string',
      label: 'Disposition',
      required: true,
      options: [
        { value: 'media-left', label: 'Image à gauche' },
        { value: 'media-right', label: 'Image à droite' },
      ],
    },
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre', required: true },
    {
      name: 'body',
      type: 'string',
      label: 'Texte',
      required: true,
      ui: { component: 'textarea' },
      description: 'Le récit. Sautez une ligne pour créer un paragraphe.',
    },
    imageField('image', 'Image'),
    { name: 'imageCaption', type: 'string', label: 'Légende de l’image (optionnel)' },
    {
      name: 'stats',
      type: 'object',
      label: 'Chiffres clés (optionnel)',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.label || 'Chiffre' }),
        description: 'Ex. « 20+ » / « Voitures de collection ». 3 maximum conseillé.',
        defaultItem: { value: '20+', label: 'Voitures de collection' },
      },
      fields: [
        { name: 'value', type: 'string', label: 'Valeur', required: true },
        { name: 'label', type: 'string', label: 'Libellé', required: true },
      ],
    },
    ...titleAppearanceFields,
  ],
};
