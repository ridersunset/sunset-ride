import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import ClientPage from './client-page';

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  try {
    const { data } = await client.queries.page({ relativePath: `${filepath}.mdx` });
    // Chemins équivalents EN / FR (slugs miroir sous /fr) pour hreflang.
    let enPath: string;
    let frPath: string;
    if (filepath === 'fr') {
      enPath = '/';
      frPath = '/fr';
    } else if (filepath.startsWith('fr/')) {
      enPath = `/${filepath.slice(3)}`;
      frPath = `/${filepath}`;
    } else {
      enPath = `/${filepath}`;
      frPath = `/fr/${filepath}`;
    }
    const isFr = filepath === 'fr' || filepath.startsWith('fr/');
    return {
      title: data.page.title,
      description: (data.page as any).description || undefined,
      alternates: {
        canonical: isFr ? frPath : enPath,
        languages: { en: enPath, fr: frPath, 'x-default': enPath },
      },
    };
  } catch {
    return {};
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === 'home')); // exclude the home page

  return params;
}
