import { defineField, defineType } from 'sanity';

export const logoWallSection = defineType({
  name: 'logoWallSection',
  title: 'Logo Wall',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Logos',
      validation: r => r.required().min(1),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              title: 'Logo',
              options: { hotspot: false },
              fields: [
                defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
              ],
              validation: r => r.required(),
            }),
            defineField({
              name: 'href',
              type: 'url',
              title: 'Link (optional)',
            }),
          ],
          preview: {
            select: { media: 'image', subtitle: 'href' },
            prepare: ({ media, subtitle }: { media: any; subtitle?: string }) => ({
              title: 'Logo',
              media,
              subtitle: subtitle ?? 'No link',
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }: { heading?: string }) => ({
      title: 'Logo Wall',
      subtitle: heading ?? '',
    }),
  },
});
