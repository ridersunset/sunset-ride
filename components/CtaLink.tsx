import Link from 'next/link';

type Props = {
  label?: string | null;
  href?: string | null;
  newTab?: boolean | null;
  className?: string;
  tinaField?: string;
};

export function CtaLink({ label, href, newTab, className, tinaField }: Props) {
  if (!href || !label) return null;
  const cls = `cta-link ${className ?? ''}`.trim();
  const isExternal = /^(https?:\/\/|tel:|mailto:)/i.test(href);
  if (isExternal || newTab) {
    return (
      <a
        href={href}
        className={cls}
        data-tina-field={tinaField}
        target={newTab ? '_blank' : undefined}
        rel={newTab ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-tina-field={tinaField}>
      {label}
    </Link>
  );
}
