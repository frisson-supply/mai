import React from 'react';
import { defineField, defineType } from 'sanity';

export const introSection = defineType({
  name: 'introSection',
  title: 'Intro',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: r => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
      description: React.createElement(React.Fragment, null, React.createElement('span', { style: { display: 'block' } }, 'YouTube: https://www.youtube.com/embed/VIDEO_ID'), React.createElement('span', { style: { display: 'block' } }, 'Vimeo: https://player.vimeo.com/video/VIDEO_ID')),
    }),
    defineField({
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect ratio',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3',  value: '4/3'  },
          { title: '21:9', value: '21/9' },
        ],
        layout: 'radio',
      },
      initialValue: '16/9',
      hidden: ({ parent }) => !parent?.videoUrl,
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }: { title?: string }) => ({
      title: 'Intro',
      subtitle: title ?? '',
    }),
  },
});
