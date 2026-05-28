import { defineField, defineType } from 'sanity';
import { mediaAssetSource } from 'sanity-plugin-media';

export const textImageBlock = defineType({
  name: 'textImageBlock',
  title: 'Text + Image',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'array',
      title: 'Text',
      of: [{ type: 'block' }],
      validation: r => r.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
      validation: r => r.required(),
    }),
    defineField({
      name: 'imagePosition',
      type: 'string',
      title: 'Image Position',
      options: {
        list: [
          { title: 'Image Left',  value: 'left' },
          { title: 'Image Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({
      name: 'imageSize',
      type: 'string',
      title: 'Image Width',
      options: {
        list: [
          { title: 'One Third',  value: 'one-third' },
          { title: 'Half',       value: 'half' },
          { title: 'Two Thirds', value: 'two-thirds' },
        ],
        layout: 'radio',
      },
      initialValue: 'half',
    }),
  ],
  preview: {
    select: { media: 'image', subtitle: 'imagePosition' },
    prepare: ({ media, subtitle }: { media: any; subtitle: string }) => ({
      title: 'Text + Image',
      media,
      subtitle,
    }),
  },
});
