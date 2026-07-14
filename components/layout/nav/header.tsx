'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tinaField } from 'tinacms/dist/react';
import { Media } from '../../Media';
import { CtaLink } from '../../CtaLink';
import { localeFromPath, toFr, altLangPath } from '../../locale';

// `overlay` : la page commence par un Héro plein cadre → header transparent
// posé PAR-DESSUS le média, qui reprend son fond crème dès qu'on scrolle.
export function Header({ header, overlay = false }: { header: any; overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const isFr = locale === 'fr';

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  if (!header) return null;

  const homeHref = isFr ? '/fr' : '/';
  const labelFor = (item: any) => (isFr ? item.labelFr || item.label : item.label);
  const hrefFor = (item: any) => (isFr ? toFr(item.href || '/') : item.href || '/');

  const links = (header.nav || []).map((item: any, i: number) => (
    <Link
      key={i}
      href={hrefFor(item)}
      className="site-header__link"
      aria-current={pathname === hrefFor(item) ? 'page' : undefined}
      data-tina-field={tinaField(item, isFr ? 'labelFr' : 'label')}
      onClick={() => setOpen(false)}
    >
      {labelFor(item)}
    </Link>
  ));

  const ctaLocalized = header.cta?.href
    ? {
        label: isFr ? header.ctaLabelFr || header.cta.label : header.cta.label,
        href: isFr ? toFr(header.cta.href) : header.cta.href,
        newTab: header.cta.newTab,
      }
    : null;

  const LangSwitch = (
    <div className="site-header__lang" role="group" aria-label={isFr ? 'Choix de la langue' : 'Language'}>
      <Link href={altLangPath(pathname || '/', 'en')} aria-current={!isFr ? 'true' : undefined} hrefLang="en">
        EN
      </Link>
      <span aria-hidden="true">/</span>
      <Link href={altLangPath(pathname || '/', 'fr')} aria-current={isFr ? 'true' : undefined} hrefLang="fr">
        FR
      </Link>
    </div>
  );

  return (
    <header className="site-header" data-overlay={overlay && !scrolled && !open ? 'true' : 'false'}>
      <div className="site-header__inner">
        <Link href={homeHref} className="site-header__logo" aria-label="Sunset Ride — accueil">
          {header.logo?.src && (
            <Media image={header.logo} tinaField={tinaField(header, 'logo')} priority sizes="200px" />
          )}
        </Link>
        <nav className="site-header__nav" aria-label={isFr ? 'Navigation principale' : 'Main navigation'}>
          {links}
        </nav>
        <div className="site-header__actions">
          {LangSwitch}
          {ctaLocalized && <CtaLink {...ctaLocalized} tinaField={tinaField(header, 'cta')} />}
        </div>
        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? (isFr ? 'Fermer le menu' : 'Close menu') : isFr ? 'Ouvrir le menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" className="site-header__mobile" aria-label={isFr ? 'Navigation mobile' : 'Mobile navigation'}>
          {links}
          {ctaLocalized && <CtaLink {...ctaLocalized} />}
          <div className="site-header__mobile-lang">{LangSwitch}</div>
        </nav>
      )}
    </header>
  );
}
