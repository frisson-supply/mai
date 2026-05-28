import { defineField, defineType } from 'sanity';
import { mediaAssetSource } from 'sanity-plugin-media';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'About' }),
  },
  groups: [
    { name: 'content',  title: 'Content',  default: true },
    { name: 'credits',  title: 'Credits' },
    { name: 'seo',      title: 'SEO' },
  ],
  fields: [
    // ── Content ──
    defineField({
      name: 'bio', type: 'array', title: 'Bio',
      of: [{ type: 'block' }],
      group: 'content',
    }),
    defineField({
      name: 'photo', type: 'image', title: 'Photo',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      group: 'content',
    }),
    defineField({
      name: 'skills', type: 'array', title: 'Skills',
      of: [{ type: 'string' }],
      group: 'content',
    }),
    defineField({ name: 'cvUrl', type: 'url', title: 'CV URL', group: 'content' }),

    // ── Credits ──
    defineField({
      name: 'brands',
      type: 'array',
      title: 'Brands',
      group: 'credits',
      of: [{
        type: 'object',
        name: 'brand',
        fields: [
          defineField({ name: 'text', type: 'string', title: 'Name' }),
          defineField({
            name: 'image',
            type: 'image',
            title: 'Logo',
            options: { hotspot: false, sources: [mediaAssetSource] },
            fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
          }),
          defineField({ name: 'link', type: 'url', title: 'Link (optional)' }),
        ],
        preview: {
          select: { title: 'text', media: 'image', subtitle: 'link' },
          prepare: ({ title, media, subtitle }) => ({
            title: title ?? 'Brand',
            media,
            subtitle: subtitle ?? 'No link',
          }),
        },
      }],
    }),
    defineField({
      name: 'recognitions',
      type: 'array',
      title: 'Recognitions / Awards',
      group: 'credits',
      of: [{
        type: 'object',
        name: 'recognition',
        fields: [
          defineField({ name: 'title', type: 'string', title: 'Title' }),
          defineField({ name: 'url', type: 'url', title: 'Link (optional)' }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'url' },
          prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
            title: title ?? 'Recognition',
            subtitle: subtitle ?? 'No link',
          }),
        },
      }],
    }),

    // ── SEO ──
    defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title', group: 'seo' }),
    defineField({
      name: 'metaDescription', type: 'text', title: 'Meta Description',
      validation: r => r.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'metaImage', type: 'image', title: 'Social Image',
      description: 'Used for OG / Twitter cards. Recommended: 1200×630px.',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      group: 'seo',
    }),
  ],
});
