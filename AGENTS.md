# AGENTS.md — Sunset Ride (site client Siteforge / TinaCMS)

Guide pour toute génération de code IA sur **ce** dépôt. Standard Siteforge
(voir `SITEFORGE-GEN-DIRECTIVES.md` dans le dossier parent — il prime en cas de
conflit).

## Ce site en bref

- **Client :** Sunset Ride — location de voitures de collection, Nice & Biarritz.
- **Stack :** Next.js 15 (App Router) · React 18 · TypeScript · Tailwind v4 ·
  TinaCMS (TinaCloud) · médias repo-based (`public/uploads`).
- **Direction artistique :** `data-style="luxe"` — kit de tokens dans
  `styles.css`. Bodoni Moda / EB Garamond / Jost via `next/font` (`app/fonts.ts`).
- **Langue :** contenu public en **anglais** (clientèle internationale),
  admin/labels Tina en **français** (client non technique).

## Règles NON NÉGOCIABLES

1. **Schéma d'abord** — tout modèle dans `tina/config.tsx` + `tina/collection/`
   avant les composants. Types générés (`tina/__generated__/`), jamais écrits à
   la main.
2. **`data-tina-field` sur CHAQUE élément éditable** (`tinaField(data, 'champ')`
   ou `tinaField(item)` pour un item de liste). Oubli = bug n°1.
3. **`useTina` côté client** — rendre le `data` retourné, jamais `props.data`.
4. **Aucune valeur visuelle en dur** dans un block : uniquement les tokens
   (`var(--accent)`, `var(--font-display)`, `--section-y`…). Test de survie :
   le composant doit survivre à un repeau Brutaliste/Décalé sans réécriture.
5. **Image = objet `{ src, alt }`** avec `alt` requis (`tina/fields.ts →
   imageField`). Liens via `linkField`.
6. **Champs FR bornés** : `label` + `description` en français, `required` +
   `ui.defaultItem` + `ui.validate`. Variantes via `options` — jamais de HTML/
   CSS libre pour le client.
7. **Nullabilité GraphQL** : un champ portant le même nom dans deux blocks doit
   avoir la même nullabilité (y compris les sous-champs `{src, alt}`) — sinon
   erreur codegen « Fields conflict ». Cf. fix `bgImage` (hero vs cta).
8. **Nouveaux blocks** : template + composant colocalisés dans
   `components/blocks/<nom>.tsx`, enregistrés dans `tina/collection/page.ts`
   ET dans le switch de `components/blocks/index.tsx` (`PageBlocks<Nom>`),
   + `...titleAppearanceFields` et `titleStyle(data)` sur le titre.

## Pièges connus (validés)

- **Build local** : `NODE_ENV=production npx tinacms build --skip-cloud-checks
  --local -c "next build"` (sinon `/404` casse avec `<Html> should not be
  imported`). Vercel gère seul.
- **`tinacms/dist/react` importé ⇒ `'use client'`** obligatoire (sinon
  `createContext is not a function` au build RSC).
- **Anti-flash reveal** : script inline dans `app/layout.tsx` +
  `suppressHydrationWarning` sur `<html>`. Ne pas retirer.
- Tina **réécrit le frontmatter** des `.mdx` en dev (ordre des clés) — normal.
- `next/image fill` exige un parent positionné.
- Les iframes Google Maps ne chargent pas dans les previews headless — normal.

## Commandes

```bash
npm run dev          # tinacms dev -c "next dev --turbopack" → /admin local
npm run build        # tinacms build && next build (prod, TinaCloud requis)
npm run lint         # biome
```

## Definition of Done (tout changement)

- Build local prod OK ; visuel vérifié desktop + 375px ; `/admin` fonctionne ;
  `data-tina-field` vérifié sur les nouveaux éléments ; aucun littéral visuel ;
  labels FR + defaults sur tout nouveau champ.
