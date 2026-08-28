import { defineField, defineType } from 'sanity';

export const homeList = defineType({
  name: 'homeList',
  title: 'Home List',
  type: 'document',
  preview: {
    prepare: () => ({ title: 'Home List' }),
  },
  fields: [
    defineField({
      name: 'items',
      title: 'List Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'listItem',
          fields: [
            defineField({ name: 'project', type: 'reference', to: [{ type: 'project' }] }),
          ],
          preview: {
            select: { title: 'project.title', media: 'project.thumbnail' },
            prepare: ({ title, media }) => ({
              title: title ?? 'No project selected',
              media,
            }),
          },
        },
      ],
    }),
  ],
});
