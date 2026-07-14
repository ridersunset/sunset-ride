import type { MetadataRoute } from 'next';
import client from '@/tina/__generated__/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let siteUrl = 'https://sunset-ride.com';
  try {
    const { data } = await client.queries.global({ relativePath: 'index.json' });
    siteUrl = (data.global as any)?.settings?.siteUrl || siteUrl;
  } catch {
    // valeurs par défaut
  }
  siteUrl = siteUrl.replace(/\/$/, '');

  const entries: MetadataRoute.Sitemap = [];
  try {
    const pages = await client.queries.pageConnection();
    for (const edge of pages.data.pageConnection.edges ?? []) {
      const crumbs = edge?.node?._sys.breadcrumbs ?? [];
      const path = crumbs.join('/');
      entries.push({
        url: path === 'home' ? siteUrl : `${siteUrl}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === 'home' ? 1 : 0.8,
      });
    }
  } catch {
    entries.push({ url: siteUrl, lastModified: new Date() });
  }
  return entries;
}
