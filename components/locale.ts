// Détection de locale à partir du chemin. Le site est bilingue :
// EN par défaut à la racine, FR sous /fr (slugs miroir : /cars ↔ /fr/cars).

export type Locale = 'en' | 'fr';

export function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return 'en';
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
}

// Préfixe un chemin interne par /fr (pour la locale française).
export function toFr(href: string): string {
  if (!href || !href.startsWith('/')) return href; // liens externes / ancres inchangés
  if (href === '/') return '/fr';
  if (href === '/fr' || href.startsWith('/fr/')) return href;
  return `/fr${href}`;
}

// Chemin équivalent dans l'autre langue (pour le sélecteur de langue).
export function altLangPath(pathname: string, target: Locale): string {
  const isFr = localeFromPath(pathname) === 'fr';
  if (target === 'fr') {
    if (isFr) return pathname;
    return pathname === '/' ? '/fr' : `/fr${pathname}`;
  }
  // vers EN
  if (!isFr) return pathname;
  return pathname === '/fr' ? '/' : pathname.replace(/^\/fr/, '');
}
