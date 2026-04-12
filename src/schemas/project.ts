import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required() }),
    defineField({
      name: 'slug', type: 'slug', title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'client', type: 'string', title: 'Client' }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'role', type: 'string', title: 'Role' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'Video URL' }),
    defineField({
      name: 'thumbnail', type: 'image', title: 'Thumbnail',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Layout Sections',
      of: [
        { type: 'projectDataSection' },
        { type: 'textSection' },
        { type: 'imageBlock' },
        { type: 'textImageBlock' },
        { type: 'videoSection' },
        { type: 'logoWallSection' },
      ],
    }),
    defineField({
      name: 'tags', type: 'array', title: 'Tags',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured', initialValue: false }),
    defineField({ name: 'order', type: 'number', title: 'Order' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
