import { defineField, defineType } from 'sanity';

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'bio', type: 'array', title: 'Bio',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'photo', type: 'image', title: 'Photo',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'skills', type: 'array', title: 'Skills',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'cvUrl', type: 'url', title: 'CV URL' }),
    defineField({
      name: 'brands',
      type: 'array',
      title: 'Brands',
      of: [{
        type: 'object',
        name: 'brand',
        fields: [
          defineField({ name: 'text', type: 'string', title: 'Name' }),
          defineField({
            name: 'image',
            type: 'image',
            title: 'Logo',
            options: { hotspot: false },
            fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
          }),
          defineField({ name: 'link', type: 'url', title: 'Link (optional)' }),
        ],
        preview: {
          select: { title: 'text', media: 'image', subtitle: 'link' },
          prepare: ({ title, media, subtitle }: { title?: string; media: any; subtitle?: string }) => ({
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
  ],
});
