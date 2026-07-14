import type { Collection } from 'tinacms';
import { ColorPickerInput } from '../fields/ColorPicker';
import { imageField, linkField } from '../fields';

const Global: Collection = {
  label: 'Réglages du site',
  name: 'global',
  path: 'content/global',
  format: 'json',
  ui: {
    global: true,
    allowedActions: { create: false, delete: false },
  },
  fields: [
    // ── Header ──────────────────────────────────────────────────────────
    {
      type: 'object',
      label: 'En-tête (header)',
      name: 'header',
      fields: [
        imageField('logo', 'Logo'),
        {
          type: 'object',
          label: 'Menu de navigation',
          name: 'nav',
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.label || 'Lien' }),
            defaultItem: { href: '/', label: 'Accueil' },
          },
          fields: [
            {
              type: 'string',
              label: 'Destination',
              name: 'href',
              required: true,
              description: 'Chemin interne (ex. /la-collection) ou URL complète.',
            },
            { type: 'string', label: 'Libellé (EN)', name: 'label', required: true },
            { type: 'string', label: 'Libellé (FR)', name: 'labelFr', description: 'Traduction française du libellé. Utilisée sur les pages /fr.' },
          ],
        },
        linkField('cta', 'Bouton de réservation'),
        { type: 'string', label: 'Bouton de réservation — libellé (FR)', name: 'ctaLabelFr', description: 'Traduction française du bouton (ex. « Réserver »).' },
      ],
    },
    // ── Footer ──────────────────────────────────────────────────────────
    {
      type: 'object',
      label: 'Pied de page (footer)',
      name: 'footer',
      fields: [
        {
          type: 'string',
          label: 'Phrase de signature (EN)',
          name: 'tagline',
          ui: { component: 'textarea' },
          description: 'Courte phrase sous le logo. Ex. « Des icônes, pas des voitures. »',
        },
        {
          type: 'string',
          label: 'Phrase de signature (FR)',
          name: 'taglineFr',
          ui: { component: 'textarea' },
          description: 'Traduction française de la phrase de signature (pages /fr).',
        },
        {
          type: 'object',
          label: 'Réseaux sociaux',
          name: 'social',
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.platform || 'Réseau' }),
            defaultItem: { platform: 'Instagram', url: 'https://www.instagram.com/_sunsetride/' },
          },
          fields: [
            {
              type: 'string',
              label: 'Plateforme',
              name: 'platform',
              required: true,
              options: [
                { value: 'Instagram', label: 'Instagram' },
                { value: 'TikTok', label: 'TikTok' },
                { value: 'Facebook', label: 'Facebook' },
                { value: 'Pinterest', label: 'Pinterest' },
                { value: 'YouTube', label: 'YouTube' },
                { value: 'LinkedIn', label: 'LinkedIn' },
              ],
            },
            { type: 'string', label: 'URL du profil', name: 'url', required: true },
          ],
        },
        {
          type: 'string',
          label: 'Mention légale (bas de page)',
          name: 'legalText',
          description: 'Ex. « © 2026 Sunset Ride — Tous droits réservés ».',
        },
      ],
    },
    // ── Settings ────────────────────────────────────────────────────────
    {
      type: 'object',
      label: 'Réglages généraux',
      name: 'settings',
      fields: [
        { type: 'string', label: 'Nom du site', name: 'siteName', required: true },
        {
          type: 'string',
          label: 'Description du site (SEO)',
          name: 'description',
          ui: { component: 'textarea' },
        },
        {
          type: 'string',
          label: 'URL du site',
          name: 'siteUrl',
          description: 'Ex. https://sunset-ride.com — sert au SEO (sitemap, Open Graph).',
        },
        imageField('ogImage', 'Image de partage (réseaux sociaux)', false),
        // Apparence pilotée par le client — bornée, jamais de champ libre.
        {
          type: 'string',
          label: 'Couleur d’accent',
          name: 'accentColor',
          description: 'La couleur des boutons, filets et mots accentués.',
          ui: { component: ColorPickerInput },
        },
        {
          type: 'string',
          label: 'Taille générale du texte',
          name: 'fontScale',
          options: [
            { value: 'compact', label: 'Compact' },
            { value: 'normal', label: 'Normal' },
            { value: 'large', label: 'Grand' },
          ],
        },
        {
          type: 'string',
          label: 'Taille des titres',
          name: 'headingScale',
          options: [
            { value: 'sm', label: 'Petits' },
            { value: 'compact', label: 'Compacts' },
            { value: 'normal', label: 'Normaux' },
            { value: 'large', label: 'Grands' },
          ],
        },
        {
          type: 'string',
          label: 'Police des titres',
          name: 'headingFont',
          options: [
            { value: 'heading', label: 'Bodoni (éditoriale — par défaut)' },
            { value: 'body', label: 'Garamond (classique)' },
            { value: 'accent', label: 'Jost (moderne)' },
          ],
        },
        // Coordonnées (SEO local + footer)
        {
          type: 'object',
          label: 'Coordonnées',
          name: 'contact',
          fields: [
            { type: 'string', label: 'Email', name: 'email', required: true },
            { type: 'string', label: 'Téléphone', name: 'phone' },
            { type: 'string', label: 'Horaires', name: 'hours' },
            {
              type: 'object',
              label: 'Adresses',
              name: 'locations',
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.city || 'Adresse' }),
                defaultItem: { city: 'Nice', address: '48 Route de Canta Galet, 06200 Nice' },
              },
              fields: [
                { type: 'string', label: 'Ville', name: 'city', required: true },
                { type: 'string', label: 'Adresse', name: 'address', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
