'use client';
import React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField, linkField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { CtaLink } from '../CtaLink';

// Titre : textarea → retours à la ligne via \n ; accentWord rendu en italique doré.
function renderTitle(title?: string | null, accentWord?: string | null) {
  if (!title) return null;
  return title.split('\n').map((line, i, arr) => (
    <React.Fragment key={i}>
      {accentWord && line.includes(accentWord) ? (
        <>
          {line.slice(0, line.indexOf(accentWord))}
          <em>{accentWord}</em>
          {line.slice(line.indexOf(accentWord) + accentWord.length)}
        </>
      ) : (
        line
      )}
      {i < arr.length - 1 && <br />}
    </React.Fragment>
  ));
}

export function Hero({ data }: { data: any }) {
  return (
    <section className="hero" data-align={data.variant || 'left'} data-tina-field={tinaField(data)}>
      <div className="hero__media" aria-hidden="true">
        {data.bgImage?.src && (
          // Poster prioritaire : LCP = cette image, la vidéo vient par-dessus.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.bgImage.src} alt="" fetchPriority="high" data-tina-field={tinaField(data, 'bgImage')} />
        )}
        {data.video && (
          <video autoPlay muted loop playsInline poster={data.bgImage?.src || undefined} data-tina-field={tinaField(data, 'video')}>
            <source src={data.video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__inner">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h1 className="hero__title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {renderTitle(data.title, data.accentWord)}
        </h1>
        {data.subtitle && (
          <p className="hero__subtitle" data-tina-field={tinaField(data, 'subtitle')}>{data.subtitle}</p>
        )}
        {(data.primaryCta?.href || data.secondaryCta?.href) && (
          <div className="hero__actions">
            {data.primaryCta?.href && (
              <CtaLink {...data.primaryCta} tinaField={tinaField(data, 'primaryCta')} />
            )}
            {data.secondaryCta?.href && (
              <CtaLink {...data.secondaryCta} className="cta-link--ghost" tinaField={tinaField(data, 'secondaryCta')} />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Section Héro',
  ui: {
    defaultItem: {
      variant: 'left',
      title: 'La Riviera,\nen héritage',
      accentWord: 'héritage',
      eyebrow: 'Location de voitures de collection',
    },
  },
  fields: [
    {
      name: 'variant',
      type: 'string',
      label: 'Placement du texte',
      required: true,
      options: [
        { value: 'left', label: 'À gauche' },
        { value: 'center', label: 'Centré' },
        { value: 'right', label: 'À droite' },
      ],
      description: 'Choisissez une variante prévue. Aucune autre disposition n’est possible.',
    },
    {
      name: 'eyebrow',
      type: 'string',
      label: 'Sur-titre (petit texte au-dessus)',
      description: 'Petite ligne en capitales au-dessus du titre. Ex. « Location de voitures de collection ».',
    },
    {
      name: 'title',
      type: 'string',
      label: 'Titre principal',
      required: true,
      ui: { component: 'textarea' },
      description: 'La grande accroche. Allez à la ligne pour forcer une coupure.',
    },
    {
      name: 'accentWord',
      type: 'string',
      label: 'Mot accentué (optionnel)',
      description: 'Un mot du titre à mettre en italique doré. Recopiez-le exactement.',
    },
    {
      name: 'subtitle',
      type: 'string',
      label: 'Sous-titre',
      ui: { component: 'textarea' },
      description: 'Une ou deux phrases qui précisent la promesse.',
    },
    {
      name: 'video',
      type: 'image',
      label: 'Vidéo de fond (optionnel, MP4)',
      description: 'Courte vidéo en boucle, sans son. L’image ci-dessous sert d’affiche pendant le chargement.',
    },
    imageField('bgImage', 'Image de fond (obligatoire — sert aussi d’affiche vidéo)'),
    linkField('primaryCta', 'Bouton principal'),
    linkField('secondaryCta', 'Bouton secondaire (optionnel)'),
    ...titleAppearanceFields,
  ],
};
