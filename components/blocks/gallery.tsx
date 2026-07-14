'use client';
import React, { useCallback, useEffect, useState } from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { imageField } from '../../tina/fields';
import { titleAppearanceFields } from '../../tina/fields/appearance';
import { titleStyle } from '../titleStyle';
import { Media } from '../Media';

export function Gallery({ data }: { data: any }) {
  const variant = data.variant || 'grid';
  const images: any[] = data.images || [];
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setLightbox((cur) => (cur === null ? cur : (cur + dir + images.length) % images.length)),
    [images.length]
  );

  // Lightbox : Échap ferme, flèches naviguent, scroll verrouillé.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [lightbox, close, step]);

  const current = lightbox !== null ? images[lightbox] : null;

  return (
    <section className="gallery section" data-variant={variant} data-tina-field={tinaField(data)}>
      <div className="container">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, 'eyebrow')}>{data.eyebrow}</p>
        )}
        <h2 className="section-title" style={titleStyle(data)} data-tina-field={tinaField(data, 'title')}>
          {data.title}
        </h2>
        <div className="gallery__grid">
          {images.map((item: any, i: number) => (
            <figure key={i} className="gallery__item" data-tina-field={tinaField(item)}>
              <button
                type="button"
                className="gallery__zoom"
                onClick={() => setLightbox(i)}
                aria-label={`Agrandir : ${item.caption || item.image?.alt || 'image'}`}
              >
                {item.image?.src &&
                  (variant === 'grid' ? (
                    <Media image={item.image} fill sizes="(max-width: 700px) 100vw, 33vw" />
                  ) : (
                    <Media image={item.image} sizes="(max-width: 700px) 100vw, 33vw" />
                  ))}
              </button>
              {item.caption && (
                <figcaption data-tina-field={tinaField(item, 'caption')}>{item.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      {current?.image?.src && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || current.image.alt || 'Image agrandie'}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button type="button" className="lightbox__close" onClick={close} aria-label="Fermer">
            ×
          </button>
          {images.length > 1 && (
            <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Image précédente">
              ←
            </button>
          )}
          <figure className="lightbox__figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.image.src} alt={current.image.alt || ''} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>
          {images.length > 1 && (
            <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Image suivante">
              →
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export const galleryBlockSchema: Template = {
  name: 'gallery',
  label: 'Section Galerie',
  ui: {
    defaultItem: { variant: 'grid', eyebrow: 'La collection', title: 'Des icônes, prêtes à partir' },
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
        { value: 'grid', label: 'Grille régulière (format 3:2 uniforme)' },
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
        description: 'Ajoutez vos photos. La légende s’affiche sur la photo ; un clic agrandit l’image.',
      },
      fields: [
        imageField('image', 'Image'),
        { name: 'caption', type: 'string', label: 'Légende (optionnel)', description: 'Ex. le nom de la voiture.' },
      ],
    },
    ...titleAppearanceFields,
  ],
};
