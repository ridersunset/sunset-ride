import type { Collection } from 'tinacms';
import { heroBlockSchema } from '../../components/blocks/hero';
import { aboutBlockSchema } from '../../components/blocks/about';
import { servicesBlockSchema } from '../../components/blocks/services';
import { galleryBlockSchema } from '../../components/blocks/gallery';
import { testimonialsBlockSchema } from '../../components/blocks/testimonials';
import { instagramBlockSchema } from '../../components/blocks/instagram';
import { ctaBlockSchema } from '../../components/blocks/call-to-action';
import { contactBlockSchema } from '../../components/blocks/contact';

const Page: Collection = {
  label: 'Pages',
  name: 'page',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join('/');
      if (filepath === 'home') return '/';
      return `/${filepath}`;
    },
  },
  fields: [
    {
      name: 'title',
      type: 'string',
      label: 'Titre de la page (SEO)',
      required: true,
      isTitle: true,
      description: 'Le titre affiché dans l’onglet du navigateur et sur Google.',
    },
    {
      name: 'description',
      type: 'string',
      label: 'Description (SEO)',
      ui: { component: 'textarea' },
      description: 'Une ou deux phrases qui résument la page pour Google (150 caractères conseillés).',
    },
    {
      name: 'blocks',
      type: 'object',
      label: 'Sections de la page',
      list: true,
      ui: {
        visualSelector: true,
        description: 'Ajoutez, réordonnez et configurez les sections. Glissez pour réorganiser.',
      },
      templates: [
        heroBlockSchema,
        aboutBlockSchema,
        servicesBlockSchema,
        galleryBlockSchema,
        testimonialsBlockSchema,
        instagramBlockSchema,
        ctaBlockSchema,
        contactBlockSchema,
      ],
    },
  ],
};

export default Page;
