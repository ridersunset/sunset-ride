import React, { PropsWithChildren } from "react";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import { Appearance } from "../Appearance";
import { StructuredData } from "../StructuredData";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    { relativePath: "index.json" },
    { fetchOptions: { next: { revalidate: 60 } } }
  );

  const global = globalData.global as any;

  // La page commence-t-elle par un Héro plein cadre ? → header en surimpression
  // (transparent au sommet, fond crème au scroll). Sinon, header plein + décalage.
  const firstBlock = rawPageData?.data?.page?.blocks?.[0];
  const overlay =
    firstBlock?.__typename === 'PageBlocksHero' || firstBlock?._template === 'hero';

  return (
    <>
      <Appearance settings={global?.settings} />
      <StructuredData global={global} />
      <Header header={global?.header} overlay={overlay} />
      <main id="contenu" className={overlay ? undefined : 'main--offset'}>{children}</main>
      <Footer global={global} />
    </>
  );
}
