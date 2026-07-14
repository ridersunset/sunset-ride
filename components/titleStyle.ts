import type { CSSProperties } from 'react';

type TitleAppearance = {
  titleSize?: string | null;
  titleFont?: string | null;
  titleColor?: string | null;
} | null;

const SIZES: Record<string, string> = {
  sm: 'calc(clamp(1.5rem, 3vw, 2.25rem) * var(--heading-scale))',
  md: 'calc(clamp(2rem, 4.2vw, 3.25rem) * var(--heading-scale))',
  lg: 'calc(clamp(2.5rem, 5.5vw, 4.25rem) * var(--heading-scale))',
  xl: 'calc(clamp(3rem, 7vw, 5.5rem) * var(--heading-scale))',
};

const FONTS: Record<string, string> = {
  heading: 'var(--font-heading), serif',
  body: 'var(--font-body), serif',
  accent: 'var(--font-accent), sans-serif',
};

const COLORS: Record<string, string> = {
  accent: 'var(--accent)',
  muted: 'var(--muted)',
};

// Apparence par block (prime sur le global). Retourne un style inline
// à poser sur le <h*> du block. Vide → tokens par défaut.
export function titleStyle(data: { titleAppearance?: TitleAppearance }): CSSProperties {
  const a = data?.titleAppearance;
  if (!a) return {};
  const style: CSSProperties = {};
  if (a.titleSize && SIZES[a.titleSize]) style.fontSize = SIZES[a.titleSize];
  if (a.titleFont && FONTS[a.titleFont]) style.fontFamily = FONTS[a.titleFont];
  if (a.titleColor && COLORS[a.titleColor]) style.color = COLORS[a.titleColor];
  return style;
}
