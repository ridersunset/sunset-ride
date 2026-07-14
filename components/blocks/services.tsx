'use client';
import React from 'react';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

// Table éditoriale aux filets fins : index · étiquette · titre/description ·
// vignette · appel « Discover ». Chaque ligne se révèle en cascade au scroll.
function RowInner({ item, index, moreLabel }: { item: any; index: number; moreLabel: string }) {
  return (
    <>
      <span className="services__index" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="services__body">
        {item.tag && <p className="services__tag" data-tina-field={tinaField(item, 'tag')}>{item.tag}</p>}
        <h3 className="services__name" data-tina-field={tinaField(item, 'title')}>{item.title}</h3>
        <p className="services__desc" data-tina-field={tinaField(item, 'description')}>{item.description}</p>
      </div>
      <div className="services__thumb" aria-hidden="true">
        {item.image?.src && <Media image={item.image} sizes="(max-width: 900px) 100vw, 300px" />}
      </div>
      {item.href && (
        <span className="services__more">
          <span className="services__more-label">{moreLabel}</span>
          <span className="services__more-arrow" aria-hidden="true">→</span>
        </span>
      )}
    </>
  );
}

export function Services({ data }: { data: any }) {
  const moreLabel = data.moreLabel || 'Discover';
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
        <ul className="services__table">
          {data.items?.map((item: any, i: number) => (
            <li key={i} className="services__row" style={{ transitionDelay: `${i * 120}ms` }} data-tina-field={tinaField(item)}>
              {item.href ? (
                <Link href={item.href} className="services__row-inner">
                  <RowInner item={item} index={i} moreLabel={moreLabel} />
                </Link>
              ) : (
                <div className="services__row-inner">
                  <RowInner item={item} index={i} moreLabel={moreLabel} />
                </div>
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
      name: 'moreLabel',
      type: 'string',
      label: 'Texte du lien de ligne',
      description: 'Le petit appel au bout de chaque ligne. Ex. « Discover » ou « Découvrir ».',
    },
    {
      name: 'items',
      type: 'object',
      label: 'Lignes',
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
        imageField('image', 'Vignette de la ligne'),
        { name: 'tag', type: 'string', label: 'Étiquette (optionnel)', description: 'Ex. « Self-drive » ou « Sur devis ».' },
        { name: 'title', type: 'string', label: 'Nom', required: true },
        { name: 'description', type: 'string', label: 'Description', required: true, ui: { component: 'textarea' } },
        { name: 'href', type: 'string', label: 'Lien de la ligne (optionnel)', description: 'Chemin interne (ex. /weddings) ou URL complète.' },
      ],
    },
    ...titleAppearanceFields,
  ],
};
