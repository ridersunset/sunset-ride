import type { TinaField } from 'tinacms';

// Groupe d'apparence réutilisable, présent sur tous les blocks à titre.
// Le niveau block PRIME sur les réglages globaux (voir components/titleStyle.ts).
// Tous optionnels — même nullabilité partout (piège GraphQL §10.2).
export const titleAppearanceFields: TinaField[] = [
  {
    name: 'titleAppearance',
    type: 'object',
    label: 'Apparence du titre (optionnel)',
    description:
      'Ajustez la taille, la police ou la couleur du titre de CETTE section. Laissez vide pour suivre le réglage global.',
    fields: [
      {
        name: 'titleSize',
        type: 'string',
        label: 'Taille du titre',
        options: [
          { value: 'sm', label: 'Petit' },
          { value: 'md', label: 'Normal' },
          { value: 'lg', label: 'Grand' },
          { value: 'xl', label: 'Très grand' },
        ],
      },
      {
        name: 'titleFont',
        type: 'string',
        label: 'Police du titre',
        options: [
          { value: 'heading', label: 'Bodoni (éditoriale)' },
          { value: 'body', label: 'Garamond (classique)' },
          { value: 'accent', label: 'Jost (moderne)' },
        ],
      },
      {
        name: 'titleColor',
        type: 'string',
        label: 'Couleur du titre',
        options: [
          { value: 'default', label: 'Encre (par défaut)' },
          { value: 'accent', label: 'Couleur d’accent' },
          { value: 'muted', label: 'Atténuée' },
        ],
      },
    ],
  },
];
