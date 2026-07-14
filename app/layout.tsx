import React from "react";
import type { Metadata } from "next";
import { heading, body, accent } from "./fonts";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LangSync } from "@/components/LangSync";

import "@/styles.css";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sunset-ride.com').replace(/\/$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sunset Ride — Classic Car Rental | French Riviera & Basque Country",
    template: "%s — Sunset Ride",
  },
  description:
    "Classic car rental on the French Riviera and the Basque Country: self-drive tours, weddings, photo shoots and rallies. Nice & Biarritz.",
};

// Anti-flash (pattern Edgard §8) : pose `reveal-on` sur <html> AVANT le 1er
// paint pour que les sections .reveal démarrent invisibles sans clignoter,
// + filet de sécurité `reveal-go` si le JS ne charge pas.
const revealScript = `document.documentElement.classList.add('reveal-on');setTimeout(function(){document.documentElement.classList.add('reveal-go')},2000);`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-style="luxe"
      className={`${heading.variable} ${body.variable} ${accent.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        {children}
        <ScrollReveal />
        <LangSync />
      </body>
    </html>
  );
}
