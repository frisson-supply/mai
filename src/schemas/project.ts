import React from 'react';
import { defineField, defineType } from 'sanity';
import { mediaAssetSource } from 'sanity-plugin-media';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content',  title: 'Content',      default: true },
    { name: 'info',     title: 'Project Info' },
    { name: 'seo',      title: 'SEO' },
  ],
  fields: [
    // ── Content ──
    defineField({ name: 'title', type: 'string', title: 'Title', validation: r => r.required(), group: 'content' }),
    defineField({
      name: 'slug', type: 'slug', title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
      group: 'content',
    }),
    defineField({ name: 'description', type: 'text', title: 'Description', group: 'content' }),
    defineField({ name: 'videoUrl', type: 'url', title: 'Video URL', description: React.createElement(React.Fragment, null, React.createElement('span', { style: { display: 'block' } }, 'YouTube: https://www.youtube.com/embed/VIDEO_ID'), React.createElement('span', { style: { display: 'block' } }, 'Vimeo: https://player.vimeo.com/video/VIDEO_ID')), group: 'content' }),
    defineField({
      name: 'thumbnail', type: 'image', title: 'Thumbnail',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      group: 'content',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Layout Sections',
      of: [
        { type: 'textSection' },
        { type: 'imageBlock' },
        { type: 'textImageBlock' },
        { type: 'videoSection' },
        { type: 'logoWallSection' },
      ],
      group: 'content',
    }),

    // ── Project Info ──
    defineField({ name: 'client',   type: 'string', title: 'Client',   group: 'info' }),
    defineField({ name: 'year',     type: 'number', title: 'Year',     group: 'info' }),
    defineField({ name: 'role',     type: 'string', title: 'Role',     group: 'info' }),
    defineField({ name: 'released', type: 'string', title: 'Released', group: 'info' }),
    defineField({ name: 'duration', type: 'string', title: 'Duration', group: 'info' }),
    defineField({ name: 'genre',    type: 'string', title: 'Genre',    group: 'info' }),
    defineField({
      name: 'infoImage', type: 'image', title: 'Info Image',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      group: 'info',
    }),
    defineField({
      name: 'tags', type: 'array', title: 'Tags',
      of: [{ type: 'string' }],
      group: 'info',
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Featured', initialValue: false, group: 'info' }),
    defineField({ name: 'order',    type: 'number',  title: 'Order',   group: 'info' }),

    // ── SEO ──
    defineField({ name: 'metaTitle', type: 'string', title: 'Meta Title', group: 'seo' }),
    defineField({ name: 'metaDescription', type: 'text', title: 'Meta Description', group: 'seo',
      validation: r => r.max(160),
    }),
    defineField({
      name: 'metaImage', type: 'image', title: 'Social Image',
      description: 'Used for OG / Twitter cards. Recommended: 1200×630px.',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
      group: 'seo',
    }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
});
