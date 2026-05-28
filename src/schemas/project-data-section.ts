import { defineField, defineType } from 'sanity';
import { mediaAssetSource } from 'sanity-plugin-media';

export const projectDataSection = defineType({
  name: 'projectDataSection',
  title: 'Project Data',
  type: 'object',
  fields: [
    defineField({ name: 'released', type: 'string', title: 'Released' }),
    defineField({ name: 'duration', type: 'string', title: 'Duration' }),
    defineField({ name: 'client',   type: 'string', title: 'Client' }),
    defineField({ name: 'role',     type: 'string', title: 'Role' }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true, sources: [mediaAssetSource] },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
      ],
    }),
  ],
  preview: {
    select: { media: 'image', subtitle: 'released' },
    prepare: ({ media, subtitle }: { media: any; subtitle: string }) => ({
      title: 'Project Data',
      media,
      subtitle: subtitle ? `Released ${subtitle}` : undefined,
    }),
  },
});
