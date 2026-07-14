import React from "react";
import type { Metadata } from "next";
import { heading, body, accent } from "./fonts";
import { ScrollReveal } from "@/components/ScrollReveal";

import "@/styles.css";

export const metadata: Metadata = {
  title: {
    default: "Sunset Ride — Location de voitures de collection | Côte d'Azur & Pays Basque",
    template: "%s — Sunset Ride",
  },
  description:
    "Location de voitures de collection sur la Côte d'Azur et au Pays Basque : road trips, mariages, shootings photo, rallyes. Nice & Biarritz.",
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
      lang="fr"
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
      </body>
    </html>
  );
}
