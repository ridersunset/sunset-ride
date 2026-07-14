# Sunset Ride — sunset-ride.com (refonte 2026)

Site vitrine **Next.js 15 (App Router) + TinaCMS** pour Sunset Ride — location de
voitures de collection (Côte d'Azur & Pays Basque). Un seul dépôt : le front,
l'éditeur visuel `/admin` et le contenu (`content/`, Git = source de vérité).

**Direction artistique : Luxe / Classique** (HEPTERACT_WEBSKIN_1) — Bodoni Moda
(titres), EB Garamond (corps), Jost (navigation), palette ivoire/encre + or
coucher-de-soleil, motion lente. Tout est piloté par les design tokens de
`styles.css` (`data-style="luxe"` sur `<html>`).

## Démarrage

```bash
cp .env.example .env        # renseigner les clés TinaCloud (voir ci-dessous)
npm install
npm run dev                 # http://localhost:3000 — éditeur sur /admin
```

En local, l'admin fonctionne **sans** TinaCloud (mode local : les modifications
écrivent directement dans `content/`).

## Build de production

```bash
npm run build               # tinacms build && next build (Vercel exécute ceci)
# Build local SANS TinaCloud (attention au piège NODE_ENV) :
NODE_ENV=production npx tinacms build --skip-cloud-checks --local -c "next build"
```

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | id du projet TinaCloud (app.tina.io) |
| `TINA_TOKEN` | token lecture TinaCloud — requis au build |
| `NEXT_PUBLIC_TINA_BRANCH` | branche suivie (`main`) |
| `NEXT_PUBLIC_SITE_URL` | URL canonique (SEO / robots) |
| `RESEND_API_KEY` *(opt.)* | envoi réel du formulaire de contact |
| `CONTACT_FROM` *(opt.)* | expéditeur vérifié chez Resend |

## Déploiement Vercel

1. Créer un **projet TinaCloud isolé** pour ce client (app.tina.io), relier le
   repo Git + la branche `main`.
2. Dans Vercel : importer le repo, poser les variables d'env **avant** le build.
3. Build command par défaut (`npm run build`) — l'éditeur est servi sur `/admin`.
4. Activer la **protection par mot de passe** Vercel sur le preview (démo client).

## Handoff client

1. Inviter le client comme utilisateur sur **son** projet TinaCloud.
2. Lui donner `https://<site>/admin` : édition « clic sur la page », aperçu en
   temps réel, publication = commit Git automatique.
3. Limites médias repo-based à mentionner : pas de renommage via le Media
   Manager (supprimer/re-uploader), 100 Mio max par fichier.

## Contenu & structure

- `content/pages/*.mdx` — pages composées de **blocks** (Héro, À propos,
  Expériences, Galerie, Témoignages, Instagram, CTA, Contact).
- `content/global/index.json` — header, footer, réglages (couleur d'accent,
  tailles de texte, police des titres, coordonnées NAP Nice & Biarritz).
- `public/uploads/` — photos réelles du client (+ `videos/hero-golden-hour.mp4`).
- Schéma Tina : `tina/config.tsx`, `tina/collection/`, `tina/fields/`.
- Blocks : `components/blocks/*.tsx` (template Tina + composant React colocalisés).

## ⚠️ À faire avant la mise en ligne définitive

- [ ] **Témoignages** : les 3 avis seedés sont des *placeholders rédactionnels* —
      les remplacer par de vrais avis Google du client.
- [ ] **Carte Google Maps** : coller le vrai lien « Intégrer une carte » dans la
      section Contact (champ validé, doit commencer par
      `https://www.google.com/maps/embed`).
- [ ] **Formulaire** : brancher `RESEND_API_KEY` + domaine expéditeur vérifié.
- [ ] Vérifier les 20 modèles listés sur la page `/cars` avec Paul (fleet réelle).
- [ ] Page mentions légales (SIREN, hébergeur, RGPD) à créer via l'admin.
