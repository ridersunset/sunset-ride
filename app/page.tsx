import React from "react";
import type { Metadata } from "next";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { data } = await client.queries.page({ relativePath: "home.mdx" });
    return {
      title: data.page.title,
      description: (data.page as any).description || undefined,
    };
  } catch {
    return {};
  }
}

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
