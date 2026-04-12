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
          { title: 'Narrow',  value: 'narrow' },
          { title: 'Normal',  value: 'normal' },
          { title: 'Wide',    value: 'wide' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  initialValue: { width: 'normal' },
  preview: {
    select: { subtitle: 'width' },
    prepare: ({ subtitle }: { subtitle: string }) => ({
      title: 'Text',
      subtitle: subtitle ?? 'normal',
    }),
  },
});
