import { defineConfig, definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool, defineLocations } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './src/schemas';
import { Dashboard } from './src/studio/dashboard';
import { Docs } from './src/studio/docs';

const dashboardPlugin = definePlugin({
  name: 'studio-dashboard',
  tools: [
    {
      name: 'dashboard',
      title: 'Dashboard',
      component: Dashboard,
    },
    {
      name: 'docs',
      title: 'Docs',
      component: Docs,
    },
  ],
});

export default defineConfig({
  name: 'mai',
  title: 'Mai',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  releases: { enabled: false },
  plugins: [
    dashboardPlugin(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('About')
              .id('about')
              .child(S.document().schemaType('about').documentId('about')),
            S.listItem()
              .title('Home List')
              .id('homeList')
              .child(S.document().schemaType('homeList').documentId('homeList')),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
    presentationTool({
      name: 'presentation',
      title: 'Preview',
      previewUrl: {
        origin:
          import.meta.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
          (import.meta.env.DEV ? 'http://localhost:4321' : undefined),
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      resolve: {
        locations: {
          project: defineLocations({
            select: { title: 'title', slug: 'slug.current' },
            resolve: (doc: { title: string; slug: string } | null) => ({
              locations: [
                {
                  title: doc?.title || 'Untitled project',
                  href: `/works/${doc?.slug}`,
                },
              ],
            }),
          }),
        },
        mainDocuments: [
          {
            route: '/works/:slug',
            filter: `_type == "project" && slug.current == $slug`,
            params: ({ params }) => ({ slug: params.slug }),
          },
        ],
      },
    }),
    ...(import.meta.env.DEV ? [visionTool()] : []),
    media(),
  ],
  schema: { types: schemaTypes },
});
