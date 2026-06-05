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
      name: 'width',
      type: 'string',
      title: 'Width',
      options: {
        list: [
          { title: 'Narrow',     value: 'narrow' },
          { title: 'Normal',     value: 'normal' },
          { title: 'Wide',       value: 'wide' },
          { title: 'Full width', value: 'full' },
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
          { title: 'Left',             value: 'left' },
          { title: 'Off left centre',  value: 'off-left-centre' },
          { title: 'Centre',           value: 'centre' },
          { title: 'Off right centre', value: 'off-right-centre' },
          { title: 'Right',            value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      hidden: ({ parent }: { parent?: { width?: string } }) => parent?.width === 'full',
    }),
    defineField({ name: 'caption', type: 'string', title: 'Caption' }),
  ],
  preview: {
    select: { media: 'image', width: 'width', position: 'position' },
    prepare: ({ media, width, position }: { media: any; width: string; position: string }) => ({
      title: 'Image',
      media,
      subtitle: width === 'full' ? 'Full width' : `${width} — ${position}`,
    }),
  },
});
