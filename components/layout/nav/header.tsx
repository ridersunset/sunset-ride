'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tinaField } from 'tinacms/dist/react';
import { Media } from '../../Media';
import { CtaLink } from '../../CtaLink';

export function Header({ header }: { header: any }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
    <header className="site-header">
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
