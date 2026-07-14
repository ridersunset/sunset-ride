'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { localeFromPath } from './locale';

// Aligne <html lang> sur la locale de la page (EN par défaut, FR sous /fr) —
// correction SEO/accessibilité côté client (le layout racine est statique).
export function LangSync() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname);
  }, [pathname]);
  return null;
}
