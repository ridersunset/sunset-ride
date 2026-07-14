'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

// Grille de posts éditables (pas de flux live — zéro dépendance externe).
export function Instagram({ data }: { data: any }) {
  return (
    <section className="instagram section" data-tina-field={tinaField(data)}>
      <div className="container title-center">
        {data.eyebrow && (
          <p className="eyebrow eyebrow--center" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        <div className="instagram__grid">
          {data.posts?.map((p: any, i: number) => (
            <a
              key={i}
              className="instagram__item"
              href={p.url || data.profileUrl}
              target="_blank"
              rel="noreferrer"
              data-tina-field={tinaField(p)}
              aria-label={p.image?.alt || 'Voir sur Instagram'}
            >
              {p.image?.src && <Media image={p.image} fill sizes="(max-width: 700px) 50vw, 25vw" />}
            </a>
          ))}
        </div>
        {data.handle && data.profileUrl && (
          <a className="instagram__handle" href={data.profileUrl} target="_blank" rel="noreferrer" data-tina-field={tinaField(data, 'handle')}>
            {data.handle} ↗
          </a>
        )}
      </div>
    </section>
  );
}

export const instagramBlockSchema: Template = {
  name: 'instagram',
  label: 'Section Instagram',
  ui: {
    defaultItem: {
      eyebrow: 'Suivez la route',
      title: 'En ce moment sur Instagram',
      handle: '@_sunsetride',
      profileUrl: 'https://www.instagram.com/_sunsetride/',
    },
  },
  fields: [
    { name: 'eyebrow', type: 'string', label: 'Sur-titre' },
    { name: 'title', type: 'string', label: 'Titre', required: true },
    { name: 'handle', type: 'string', label: 'Pseudo affiché', required: true, description: 'Ex. @_sunsetride' },
    { name: 'profileUrl', type: 'string', label: 'Lien du profil', required: true },
    {
      name: 'posts',
      type: 'object',
      label: 'Posts (images)',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.image?.alt || 'Post' }),
        description: '4 ou 8 images conseillées. Chaque image renvoie vers le post ou le profil.',
      },
      fields: [
        imageField('image', 'Image du post'),
        { name: 'url', type: 'string', label: 'Lien du post (optionnel)', description: 'URL du post Instagram. Vide = renvoie au profil.' },
      ],
    },
    ...titleAppearanceFields,
  ],
};
