import React, { PropsWithChildren } from "react";
import client from "../../tina/__generated__/client";
import { Header } from "./nav/header";
import { Footer } from "./nav/footer";
import { Appearance } from "../Appearance";
import { StructuredData } from "../StructuredData";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children }: LayoutProps) {
  const { data: globalData } = await client.queries.global(
    { relativePath: "index.json" },
    { fetchOptions: { next: { revalidate: 60 } } }
  );

  const global = globalData.global as any;

  return (
    <>
      <Appearance settings={global?.settings} />
      <StructuredData global={global} />
      <Header header={global?.header} />
      <main id="contenu">{children}</main>
      <Footer global={global} />
    </>
  );
}
