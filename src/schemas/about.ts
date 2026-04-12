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
  ],
});
