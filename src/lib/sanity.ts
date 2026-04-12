import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  // Token is optional — omit to use public read access for publicly readable datasets
  ...(import.meta.env.SANITY_API_READ_TOKEN
    ? { token: import.meta.env.SANITY_API_READ_TOKEN }
    : {}),
});

const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
