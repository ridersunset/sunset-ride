import { Bodoni_Moda, EB_Garamond, Jost } from "next/font/google";

// Direction artistique : Luxe / Classique (HEPTERACT_WEBSKIN_1)
// Serif haute-contraste pour les titres, garalde pour le corps,
// sans géométrique légère pour la navigation et les sur-titres.
// Self-hostées au build par next/font — aucun CDN externe.

export const heading = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export const body = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const accent = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-accent",
  display: "swap",
});
