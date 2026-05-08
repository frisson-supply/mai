import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', type: 'string', title: 'Site Title' }),
    defineField({ name: 'role', type: 'string', title: 'Role / Occupation' }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'showreelUrl', type: 'url', title: 'Showreel URL' }),
    defineField({
      name: 'socialLinks', type: 'array', title: 'Social Links',
      of: [{
        type: 'object',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform' },
          { name: 'url', type: 'url', title: 'URL' },
        ],
      }],
    }),
    defineField({ name: 'seoDescription', type: 'text', title: 'SEO Description' }),
  ],
});
