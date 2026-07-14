'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

export function Gallery({ data }: { data: any }) {
  return (
    <section className="gallery section" data-variant={data.variant || 'grid'} data-tina-field={tinaField(data)}>
      <div className="container">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        <div className="gallery__grid">
          {data.images?.map((item: any, i: number) => (
            <figure key={i} className="gallery__item" data-tina-field={tinaField(item)}>
              {item.image?.src && <Media image={item.image} sizes="(max-width: 700px) 100vw, 33vw" />}
              {item.caption && (
                <figcaption data-tina-field={tinaField(item, 'caption')}>{item.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export const galleryBlockSchema: Template = {
  name: 'gallery',
  label: 'Section Galerie',
  ui: {
    defaultItem: { variant: 'masonry', eyebrow: 'La collection', title: 'Des icônes, prêtes à partir' },
  },
  fields: [
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre', required: true },
    {
      name: 'variant',
      type: 'string',
      label: 'Disposition',
      required: true,
      options: [
        { value: 'grid', label: 'Grille régulière' },
        { value: 'masonry', label: 'Mosaïque éditoriale' },
      ],
    },
    {
      name: 'images',
      type: 'object',
      label: 'Images',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.caption || item?.image?.alt || 'Image' }),
        description: 'Ajoutez vos photos. La légende s’affiche au bas de l’image.',
      },
      fields: [
        imageField('image', 'Image'),
        { name: 'caption', type: 'string', label: 'Légende (optionnel)', description: 'Ex. le nom de la voiture.' },
      ],
    },
    ...titleAppearanceFields,
  ],
};
