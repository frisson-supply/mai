import { defineField, defineType } from 'sanity';
import { GridEditorInput } from '../studio/grid-editor';

export const homeGrid = defineType({
  name: 'homeGrid',
  title: 'Home Grid',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Home Grid' }),
  },
  fields: [
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      components: { input: GridEditorInput },
      of: [
        {
          type: 'object',
          name: 'gridItem',
          fields: [
            defineField({ name: 'project',     type: 'reference', to: [{ type: 'project' }] }),
            defineField({ name: 'featured',    type: 'boolean',   title: 'Featured (hero)', initialValue: false }),
            defineField({ name: 'columnStart', type: 'number',    title: 'Column Start' }),
            defineField({ name: 'columnSpan',  type: 'number',    title: 'Column Span'  }),
            defineField({ name: 'rowStart',    type: 'number',    title: 'Row Start',   validation: (Rule) => Rule.min(1).max(3) }),
            defineField({ name: 'rowSpan',     type: 'number',    title: 'Row Span',    validation: (Rule) => Rule.min(1).max(3) }),
          ],
        },
      ],
    }),
  ],
});
