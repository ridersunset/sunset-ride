import NextImage from 'next/image';

type ImageObj = { src?: string | null; alt?: string | null };
type Props = {
  image?: ImageObj | null;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  tinaField?: string; // résultat de tinaField(...) → clic-sur-la-page
};

// Rend une image depuis l'objet { src, alt } (alt garanti par le schéma).
export function Media({ image, className, priority, fill, sizes, tinaField }: Props) {
  if (!image?.src) return null;
  const alt = image.alt ?? '';
  if (fill) {
    return (
      <span data-tina-field={tinaField} style={{ display: 'contents' }}>
        <NextImage src={image.src} alt={alt} fill sizes={sizes ?? '100vw'} className={className} priority={priority} />
      </span>
    );
  }
  return (
    <NextImage
      data-tina-field={tinaField}
      src={image.src}
      alt={alt}
      width={1600}
      height={1067}
      sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
      className={className}
      priority={priority}
      style={{ width: '100%', height: 'auto' }}
    />
  );
}
