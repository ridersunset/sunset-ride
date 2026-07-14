import type { TinaField } from 'tinacms';

// Image AVEC alt obligatoire. Le champ `image` de Tina ne stocke qu'un chemin ;
// on enveloppe donc src + alt dans un objet pour rendre l'alt requis.
export const imageField = (
  name = 'image',
  label = 'Image',
  required = true
): TinaField => ({
  name,
  type: 'object',
  label,
  fields: [
    { name: 'src', type: 'image', label: 'Fichier', required },
    {
      name: 'alt',
      type: 'string',
      label: 'Texte alternatif (accessibilité + SEO)',
      required,
      description:
        'Décrivez l’image en une phrase. Ex. « Mercedes Pagode blanche au coucher du soleil ». Obligatoire.',
    },
  ],
});

// Bouton / lien réutilisable.
export const linkField = (name = 'cta', label = 'Bouton / lien'): TinaField => ({
  name,
  type: 'object',
  label,
  fields: [
    { name: 'label', type: 'string', label: 'Texte du bouton', required: true },
    {
      name: 'href',
      type: 'string',
      label: 'Destination (URL ou /page)',
      required: true,
      description:
        'Une URL complète (https://…), un chemin interne commençant par /, tel:+33… ou mailto:…',
    },
    { name: 'newTab', type: 'boolean', label: 'Ouvrir dans un nouvel onglet' },
  ],
});
