import type { SanityClient } from '@sanity/client';
import { sanityClient } from './sanity';
import type {
  ProjectSummary,
  ProjectDetail,
  NextProjectRef,
  SiteSettings,
  HomeGrid,
  About,
} from './types';

async function safeFetch<T>(
  query: string,
  params?: Record<string, unknown>,
  client: SanityClient = sanityClient
): Promise<T> {
  try {
    return await client.fetch<T>(query, params ?? {});
  } catch (err) {
    console.warn('[Sanity] Query failed:', err instanceof Error ? err.message : err);
    return null as T;
  }
}

export async function getAllProjects() {
  return safeFetch<ProjectSummary[]>(
    `*[_type == "project"] | order(order asc) {
      _id, title, "slug": slug.current, role, tags, thumbnail, featured
    }`
  ).then(r => r ?? []);
}

export async function getFeaturedProjects() {
  return safeFetch<ProjectSummary[]>(
    `*[_type == "project" && featured == true] | order(order asc) {
      _id, title, "slug": slug.current, role, tags, thumbnail, featured
    }`
  ).then(r => r ?? []);
}

export async function getProjectBySlug(slug: string, client?: SanityClient) {
  return safeFetch<ProjectDetail>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, role, tags, thumbnail, featured,
      description, released, duration, genre, infoImage,
      videoUrl,
      metaTitle, metaDescription, "metaImageUrl": metaImage.asset->url,
      sections[] {
        _type, _key,
        text, width,
        image { asset, alt },
        width, position, caption,
        imagePosition, imageSize,
        url, aspectRatio,
        heading,
        logos[] { "src": image.asset->url, "alt": image.alt, href }
      }
    }`,
    { slug },
    client
  );
}

export async function getNextProject(currentSlug: string, client?: SanityClient) {
  const current = await safeFetch<{ order: number; nextProject?: NextProjectRef }>(
    `*[_type == "project" && slug.current == $slug][0] {
      order,
      nextProject->{ _id, title, "slug": slug.current, tags, thumbnail }
    }`,
    { slug: currentSlug },
    client
  );

  if (!current) return null;

  if (current.nextProject) return current.nextProject;

  const next = await safeFetch<NextProjectRef>(
    `*[_type == "project" && order > $order && slug.current != $slug] | order(order asc) [0] {
      _id, title, "slug": slug.current, tags, thumbnail
    }`,
    { order: current.order, slug: currentSlug },
    client
  );

  if (next) return next;

  return safeFetch<NextProjectRef>(
    `*[_type == "project" && slug.current != $slug] | order(order asc) [0] {
      _id, title, "slug": slug.current, tags, thumbnail
    }`,
    { slug: currentSlug },
    client
  );
}

export async function getAllProjectSlugs() {
  return safeFetch<{ slug: string }[]>(
    `*[_type == "project"] { "slug": slug.current }`
  ).then(r => r ?? []);
}

export async function getSiteSettings() {
  return safeFetch<SiteSettings>(
    `*[_type == "siteSettings"][0] { siteTitle, role, location, showreelUrl, socialLinks, seoDescription, "faviconUrl": favicon.asset->url, "ogImageUrl": ogImage.asset->url }`
  );
}

export async function getHomeGrid() {
  return safeFetch<HomeGrid>(
    `*[_type == "homeGrid" && _id == "homeGrid"][0] {
      items[defined(project->_id)] {
        _key,
        featured,
        columnStart,
        columnSpan,
        rowStart,
        rowSpan,
        project->{ _id, title, "slug": slug.current, tags, thumbnail }
      }
    }`
  );
}

export async function getAbout() {
  return safeFetch<About>(
    `*[_type == "about"][0] { bio, photo, skills, cvUrl, brands[] { text, image, link }, recognitions[] { title, url }, metaTitle, metaDescription, "metaImageUrl": metaImage.asset->url }`
  );
}
