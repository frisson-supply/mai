import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'links',    title: 'Links' },
    { name: 'seo',      title: 'SEO & Branding' },
  ],
  fields: [
    // ── Identity ──
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title',         group: 'identity' }),
    defineField({ name: 'role',      type: 'string', title: 'Role / Occupation',  group: 'identity' }),
    defineField({ name: 'location',  type: 'string', title: 'Location',           group: 'identity' }),

    // ── Links ──
    defineField({ name: 'showreelUrl', type: 'url', title: 'Showreel URL', group: 'links' }),
    defineField({
      name: 'socialLinks', type: 'array', title: 'Social Links',
      group: 'links',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform' },
          { name: 'url',      type: 'url',    title: 'URL' },
        ],
      }],
    }),

    // ── SEO & Branding ──
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description', group: 'seo' }),
    defineField({
      name: 'favicon',
      type: 'image',
      title: 'Favicon',
      description: 'Recommended: SVG or square PNG (at least 512×512px).',
      options: { accept: 'image/svg+xml, image/png, image/x-icon' },
      group: 'seo',
    }),
  ],
});
