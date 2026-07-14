'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tinaField } from 'tinacms/dist/react';
import { Media } from '../../Media';
import { CtaLink } from '../../CtaLink';

// `overlay` : la page commence par un Héro plein cadre → header transparent
// posé PAR-DESSUS le média, qui reprend son fond crème dès qu'on scrolle.
export function Header({ header, overlay = false }: { header: any; overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!overlay) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overlay]);

  if (!header) return null;

  const links = (header.nav || []).map((item: any, i: number) => (
    <Link
      key={i}
      href={item.href || '/'}
      className="site-header__link"
      aria-current={pathname === item.href ? 'page' : undefined}
      data-tina-field={tinaField(item, 'label')}
      onClick={() => setOpen(false)}
    >
      {item.label}
    </Link>
  ));

  return (
    <header
      className="site-header"
      data-overlay={overlay && !scrolled && !open ? 'true' : 'false'}
    >
      <div className="site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="Sunset Ride — accueil">
          {header.logo?.src && (
            <Media image={header.logo} tinaField={tinaField(header, 'logo')} priority sizes="200px" />
          )}
        </Link>
        <nav className="site-header__nav" aria-label="Navigation principale">
          {links}
        </nav>
        {header.cta?.href && <CtaLink {...header.cta} tinaField={tinaField(header, 'cta')} />}
        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      {open && (
        <nav id="menu-mobile" className="site-header__mobile" aria-label="Navigation mobile">
          {links}
          {header.cta?.href && <CtaLink {...header.cta} />}
        </nav>
      )}
    </header>
  );
}
