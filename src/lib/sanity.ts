import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const baseConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
};

export const sanityClient = createClient({
  ...baseConfig,
  // Token is optional — omit to use public read access for publicly readable datasets
  ...(import.meta.env.SANITY_API_READ_TOKEN
    ? { token: import.meta.env.SANITY_API_READ_TOKEN }
    : {}),
});

// Used only in Presentation preview mode — fetches drafts, stega-encodes fields
// so click-to-edit overlays can locate them in the DOM.
export const draftModeClient = createClient({
  ...baseConfig,
  token: import.meta.env.SANITY_API_READ_TOKEN,
  perspective: 'previewDrafts',
  stega: { enabled: true, studioUrl: '/studio' },
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
