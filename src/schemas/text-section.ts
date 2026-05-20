import { defineField, defineType } from 'sanity';

export const textSection = defineType({
  name: 'textSection',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      type: 'array',
      title: 'Content',
      of: [{ type: 'block' }],
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
      initialValue: 'normal',
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
      hidden: ({ parent }: any) => parent?.width === 'full',
    }),
  ],
  initialValue: { width: 'normal', position: 'left' },
  preview: {
    select: { subtitle: 'width' },
    prepare: ({ subtitle }: { subtitle: string }) => ({
      title: 'Text',
      subtitle: subtitle ?? 'normal',
    }),
  },
});
