import React from 'react';
import { defineField, defineType } from 'sanity';

export const videoSection = defineType({
  name: 'videoSection',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'Video URL',
      description: React.createElement(React.Fragment, null, React.createElement('span', { style: { display: 'block' } }, 'YouTube: https://www.youtube.com/embed/VIDEO_ID'), React.createElement('span', { style: { display: 'block' } }, 'Vimeo: https://player.vimeo.com/video/VIDEO_ID')),
      validation: r => r.required(),
    }),
    defineField({
      name: 'aspectRatio',
      type: 'string',
      title: 'Aspect Ratio',
      options: {
        list: [
          { title: '16:9 (Landscape)', value: '16/9' },
          { title: '4:3',              value: '4/3' },
          { title: '1:1 (Square)',     value: '1/1' },
          { title: '9:16 (Vertical)',  value: '9/16' },
        ],
        layout: 'radio',
      },
      initialValue: '16/9',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  initialValue: { aspectRatio: '16/9' },
  preview: {
    select: { subtitle: 'url' },
    prepare: ({ subtitle }: { subtitle: string }) => ({
      title: 'Video Embed',
      subtitle: subtitle ?? '',
    }),
  },
});
