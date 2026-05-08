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
    defineField({
      name: 'recognitions',
      type: 'array',
      title: 'Recognitions',
      of: [{
        type: 'object',
        name: 'recognition',
        fields: [
          { name: 'platform', type: 'string', title: 'Platform' },
          { name: 'project', type: 'string', title: 'Project' },
          { name: 'award', type: 'string', title: 'Award' },
        ],
      }],
    }),
  ],
});
