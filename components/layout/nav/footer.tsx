'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tinaField } from 'tinacms/dist/react';
import { Media } from '../../Media';
import { localeFromPath, toFr } from '../../locale';

export function Footer({ global }: { global: any }) {
  const footer = global?.footer;
  const header = global?.header;
  const contact = global?.settings?.contact;
  const pathname = usePathname();
  const isFr = localeFromPath(pathname) === 'fr';

  const tagline = isFr ? footer?.taglineFr || footer?.tagline : footer?.tagline;
  const labelFor = (item: any) => (isFr ? item.labelFr || item.label : item.label);
  const hrefFor = (item: any) => (isFr ? toFr(item.href || '/') : item.href || '/');

  return (
    <footer className="site-footer">
      <div className="site-footer__inner reveal">
        <div>
          {header?.logo?.src && (
            <div className="site-footer__logo">
              <Media image={header.logo} sizes="220px" />
            </div>
          )}
          {tagline && (
            <p className="site-footer__tagline" data-tina-field={tinaField(footer, isFr ? 'taglineFr' : 'tagline')}>
              {tagline}
            </p>
          )}
        </div>

        <nav aria-label={isFr ? 'Navigation pied de page' : 'Footer navigation'}>
          <h2 className="site-footer__heading">{isFr ? 'Explorer' : 'Explore'}</h2>
          <ul>
            {(header?.nav || []).map((item: any, i: number) => (
              <li key={i}>
                <Link href={hrefFor(item)}>{labelFor(item)}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__heading">Contact</h2>
          <address>
            {contact?.email && (
              <>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <br />
              </>
            )}
            {contact?.phone && (
              <>
                <a href={`tel:${(contact.phone || '').replace(/\s/g, '')}`}>{contact.phone}</a>
                <br />
              </>
            )}
            {(contact?.locations || []).map((loc: any, i: number) => (
              <React.Fragment key={i}>
                <span>
                  {loc.city} — {loc.address}
                </span>
                <br />
              </React.Fragment>
            ))}
          </address>
          {footer?.social?.length > 0 && (
            <ul style={{ display: 'flex', gap: '1.25rem', marginTop: '1.5rem' }}>
              {footer.social.map((s: any, i: number) => (
                <li key={i}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    data-tina-field={tinaField(s)}
                    style={{
                      fontFamily: 'var(--font-accent), sans-serif',
                      fontSize: '0.72rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {footer?.legalText && (
        <div className="site-footer__legal" data-tina-field={tinaField(footer, 'legalText')}>
          {footer.legalText}
        </div>
      )}
    </footer>
  );
}
