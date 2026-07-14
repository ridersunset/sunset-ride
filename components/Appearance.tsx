import React from 'react';

type Settings = {
  accentColor?: string | null;
  fontScale?: string | null;
  headingScale?: string | null;
  headingFont?: string | null;
} | null;

const FONT_SCALES: Record<string, string> = {
  compact: '0.95',
  normal: '1',
  large: '1.08',
};

const HEADING_SCALES: Record<string, string> = {
  sm: '0.85',
  compact: '0.95',
  normal: '1',
  large: '1.1',
};

const HEADING_FONTS: Record<string, string> = {
  heading: 'var(--font-heading), serif',
  body: 'var(--font-body), serif',
  accent: 'var(--font-accent), sans-serif',
};

// Injecte les réglages d'apparence globaux (Tina → settings) en variables CSS.
// Rendu côté serveur dans le layout — aucun flash.
export function Appearance({ settings }: { settings: Settings }) {
  if (!settings) return null;
  const rules: string[] = [];
  if (settings.accentColor) rules.push(`--accent: ${settings.accentColor};`);
  if (settings.fontScale && FONT_SCALES[settings.fontScale]) {
    rules.push(`--font-scale: ${FONT_SCALES[settings.fontScale]};`);
  }
  if (settings.headingScale && HEADING_SCALES[settings.headingScale]) {
    rules.push(`--heading-scale: ${HEADING_SCALES[settings.headingScale]};`);
  }
  if (settings.headingFont && HEADING_FONTS[settings.headingFont]) {
    rules.push(`--font-display: ${HEADING_FONTS[settings.headingFont]};`);
  }
  if (!rules.length) return null;
  return <style>{`:root{${rules.join('')}}`}</style>;
}
