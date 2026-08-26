import type { APIRoute } from 'astro';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { sanityClient } from '@/lib/sanity';

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(sanityClient, request.url);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401 });
  }

  cookies.set('sanity-preview-drafts', 'previewDrafts', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
  });

  return redirect(redirectTo);
};
