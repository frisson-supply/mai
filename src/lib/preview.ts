import type { AstroCookies } from 'astro';
import { sanityClient, draftModeClient } from './sanity';

export function isPreviewMode(cookies: AstroCookies) {
  return cookies.has('sanity-preview-drafts');
}

export function getClient(cookies: AstroCookies) {
  return isPreviewMode(cookies) ? draftModeClient : sanityClient;
}
