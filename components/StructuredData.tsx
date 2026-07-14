import React from 'react';

// JSON-LD AutoRental (LocalBusiness) alimenté par le global `settings`.
export function StructuredData({ global }: { global: any }) {
  const s = global?.settings;
  const contact = s?.contact;
  if (!s?.siteName) return null;

  const siteUrl = s.siteUrl || 'https://sunset-ride.com';

  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: s.siteName,
    description: s.description || undefined,
    url: siteUrl,
    email: contact?.email || undefined,
    telephone: contact?.phone || undefined,
    image: s.ogImage?.src ? `${siteUrl}${s.ogImage.src}` : undefined,
    priceRange: '€€€',
    openingHours: 'Mo-Su 09:00-19:00',
    areaServed: ['French Riviera', 'Côte d’Azur', 'Pays Basque', 'Biarritz', 'Nice'],
    address: (contact?.locations || []).map((loc: any) => ({
      '@type': 'PostalAddress',
      addressLocality: loc.city,
      streetAddress: loc.address,
      addressCountry: 'FR',
    })),
    sameAs: (global?.footer?.social || []).map((so: any) => so.url).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
