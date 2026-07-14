'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField, linkField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { CtaLink } from '../CtaLink';

// Titre : textarea → retours à la ligne via \n ; accentWord rendu en italique doré.
// Chaque ligne est masquée puis « monte » à l'entrée (animation hero-line).
function renderTitle(title?: string | null, accentWord?: string | null) {
  if (!title) return null;
  return title.split('\n').map((line, i) => (
    <span className="hero__line" key={i}>
      <span className="hero__line-inner" style={{ animationDelay: `${0.35 + i * 0.14}s` }}>
        {accentWord && line.includes(accentWord) ? (
          <>
            {line.slice(0, line.indexOf(accentWord))}
            <em>{accentWord}</em>
            {line.slice(line.indexOf(accentWord) + accentWord.length)}
          </>
        ) : (
          line
        )}
      </span>
    </span>
  ));
}

// Fond vidéo en cascade : le fondu enchaîné démarre AVANT la fin de la vidéo
// active — les deux vidéos jouent pendant le recouvrement, donc aucune image
// figée ni coupe sèche. Une seule vidéo → boucle simple. Poster = bgImage.
const CROSSFADE_S = 1.6;

function HeroVideos({ videos, poster, tinaFieldAttr }: { videos: string[]; poster?: string; tinaFieldAttr?: string }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const switching = useRef(false);
  const single = videos.length === 1;

  useEffect(() => {
    switching.current = false;
    const el = refs.current[active];
    if (el) {
      el.currentTime = 0;
      el.play().catch(() => {});
    }
    // L'ancienne vidéo continue de jouer pendant le fondu, puis est mise en pause.
    const t = setTimeout(() => {
      refs.current.forEach((v, i) => {
        if (v && i !== active) v.pause();
      });
    }, CROSSFADE_S * 1000 + 150);
    return () => clearTimeout(t);
  }, [active]);

  if (!videos.length) return null;

  return (
    <span style={{ display: 'contents' }} data-tina-field={tinaFieldAttr}>
      {videos.map((src, i) => (
        <video
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="hero__video"
          data-active={i === active}
          autoPlay={i === 0}
          muted
          loop={single}
          playsInline
          preload="auto"
          poster={i === 0 ? poster : undefined}
          onTimeUpdate={(e) => {
            if (single || i !== active || switching.current) return;
            const v = e.currentTarget;
            // Bascule CROSSFADE_S avant la fin → recouvrement fluide.
            if (v.duration && v.duration - v.currentTime <= CROSSFADE_S) {
              switching.current = true;
              setActive((a) => (a + 1) % videos.length);
            }
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </span>
  );
}

export function Hero({ data }: { data: any }) {
  const videos: string[] = (data.videos || []).map((v: any) => v?.src).filter(Boolean);
  return (
    <section className="hero" data-align={data.variant || 'left'} data-tina-field={tinaField(data)}>
      <div className="hero__media" aria-hidden="true">
        {data.bgImage?.src && (
          // Poster prioritaire : LCP = cette image, les vidéos viennent par-dessus.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.bgImage.src} alt="" fetchPriority="high" data-tina-field={tinaField(data, 'bgImage')} />
        )}
        <HeroVideos videos={videos} poster={data.bgImage?.src} tinaFieldAttr={tinaField(data, 'videos')} />
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__inner">
        {data.eyebrow && (
          <p className="eyebrow hero__eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
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
      name: 'videos',
      type: 'object',
      label: 'Vidéos de fond (optionnel)',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.src ? String(item.src).split('/').pop() : 'Vidéo' }),
        description:
          'Courtes vidéos MP4 sans son, jouées l’une après l’autre en fondu enchaîné. L’image ci-dessous sert d’affiche pendant le chargement.',
      },
      fields: [
        { name: 'src', type: 'image', label: 'Fichier vidéo (MP4)', required: true },
      ],
    },
    imageField('bgImage', 'Image de fond (obligatoire — sert aussi d’affiche vidéo)'),
    linkField('primaryCta', 'Bouton principal'),
    linkField('secondaryCta', 'Bouton secondaire (optionnel)'),
    ...titleAppearanceFields,
  ],
};
