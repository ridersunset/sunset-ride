'use client';
import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

function CardInner({ item }: { item: any }) {
  return (
    <>
      <div className="services__figure">
        {item.image?.src && <Media image={item.image} sizes="(max-width: 700px) 100vw, 25vw" />}
      </div>
      {item.tag && <p className="services__tag" data-tina-field={tinaField(item, 'tag')}>{item.tag}</p>}
      <h3 className="services__name" data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
      <p className="services__desc" data-tina-field={tinaField(item, 'description')}>{item.description}</p>
      {item.href && <span className="services__more">Découvrir</span>}
    </>
  );
}

export function Services({ data }: { data: any }) {
  return (
    <section className="services section" data-tina-field={tinaField(data)}>
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
        <ul className="services__grid">
          {data.items?.map((item: any, i: number) => (
            <li key={i} className="services__card" data-tina-field={tinaField(item)}>
              {item.href ? (
                <Link href={item.href} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <CardInner item={item} />
                </Link>
              ) : (
                <CardInner item={item} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const servicesBlockSchema: Template = {
  name: 'services',
  label: 'Section Expériences / Services',
  ui: {
    defaultItem: {
      eyebrow: 'Nos expériences',
      title: 'Quatre façons de prendre la route',
    },
  },
  fields: [
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre de la section', required: true },
    { name: 'intro', type: 'string', label: 'Introduction (optionnel)', ui: { component: 'textarea' } },
    {
      name: 'items',
      type: 'object',
      label: 'Cartes',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || 'Expérience' }),
        description: 'Ajoutez vos expériences. Glissez pour réordonner.',
        defaultItem: {
          title: 'Nouvelle expérience',
          description: 'Décrivez cette expérience en une ou deux phrases.',
        },
      },
      fields: [
        imageField('image', 'Image de la carte'),
        { name: 'tag', type: 'string', label: 'Étiquette (optionnel)', description: 'Ex. « Sans chauffeur » ou « Sur devis ».' },
        { name: 'title', type: 'string', label: 'Nom', required: true },
        { name: 'description', type: 'string', label: 'Description', required: true, ui: { component: 'textarea' } },
        { name: 'href', type: 'string', label: 'Lien de la carte (optionnel)', description: 'Chemin interne (ex. /mariages) ou URL complète.' },
      ],
    },
    ...titleAppearanceFields,
  ],
};
