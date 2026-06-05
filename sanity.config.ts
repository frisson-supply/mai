import { defineConfig, definePlugin } from 'sanity';
import { structureTool } from 'sanity/structure';
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
              .title('Home Grid')
              .id('homeGrid')
              .child(S.document().schemaType('homeGrid').documentId('homeGrid')),
            S.divider(),
            S.documentTypeListItem('project').title('Projects'),
          ]),
    }),
    ...(import.meta.env.DEV ? [visionTool()] : []),
    media(),
  ],
  schema: { types: schemaTypes },
});
