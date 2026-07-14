import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="container title-center" style={{ width: "100%" }}>
        <p className="eyebrow eyebrow--center">Erreur 404</p>
        <h1 className="section-title" style={{ marginInline: "auto" }}>
          Cette route ne mène <em>nulle part</em>
        </h1>
        <p className="section-intro" style={{ marginInline: "auto" }}>
          La page que vous cherchez n’existe pas ou a changé d’adresse.
        </p>
        <p style={{ marginTop: "2.5rem" }}>
          <Link href="/" className="cta-link">
            Retour à l’accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
