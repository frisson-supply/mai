import { defineField, defineType } from 'sanity';
import { mediaAssetSource } from 'sanity-plugin-media';

export const imageBlock = defineType({
  name: 'imageBlock',
  title: 'Image',
  type: 'object',
  fields: [
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
      name: 'size',
      type: 'string',
      title: 'Size',
      options: {
        list: [
          { title: 'Full Width',  value: 'full' },
          { title: 'Two Thirds',  value: 'two-thirds' },
          { title: 'Half',        value: 'half' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'position',
      type: 'string',
      title: 'Position',
      options: {
        list: [
          { title: 'Left',   value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right',  value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      hidden: ({ parent }: { parent?: { size?: string } }) => parent?.size === 'full',
    }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
  ],
  preview: {
    select: { media: 'image', size: 'size', position: 'position' },
    prepare: ({ media, size, position }: { media: any; size: string; position: string }) => ({
      title: 'Image',
      media,
      subtitle: size === 'full' ? 'Full Width' : `${size} — ${position}`,
    }),
  },
});
