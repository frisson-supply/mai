import { sanityClient } from './sanity';

async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params ?? {});
  } catch (err) {
    console.warn('[Sanity] Query failed:', err instanceof Error ? err.message : err);
    return (Array.isArray(await Promise.resolve(null)) ? [] : null) as T;
  }
}

export async function getAllProjects() {
  return safeFetch<any[]>(
    `*[_type == "project"] | order(order asc) {
      _id, title, "slug": slug.current, client, year, role, tags, thumbnail, featured
    }`
  ).then(r => r ?? []);
}

export async function getFeaturedProjects() {
  return safeFetch<any[]>(
    `*[_type == "project" && featured == true] | order(order asc) {
      _id, title, "slug": slug.current, client, year, role, tags, thumbnail, featured
    }`
  ).then(r => r ?? []);
}

export async function getProjectBySlug(slug: string) {
  return safeFetch<any>(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, title, "slug": slug.current, client, year, role, tags, thumbnail, featured,
      description, released, duration, genre, infoImage,
      videoUrl,
      metaTitle, metaDescription, "metaImageUrl": metaImage.asset->url,
      sections[] {
        _type, _key,
        title, description,
        text, width,
        image { asset, alt },
        size, position, caption,
        imagePosition, imageSize,
        url, videoUrl, aspectRatio,
        released, duration, client, role,
        heading,
        logos[] { "src": image.asset->url, "alt": image.alt, href }
      }
    }`,
    { slug }
  );
}

export async function getNextProject(currentSlug: string) {
  const current = await safeFetch<{ order: number; nextProject?: any }>(
    `*[_type == "project" && slug.current == $slug][0] {
      order,
      nextProject->{ _id, title, "slug": slug.current, client, year, tags, thumbnail }
    }`,
    { slug: currentSlug }
  );

  if (!current) return null;

  if (current.nextProject) return current.nextProject;

  const next = await safeFetch<any>(
    `*[_type == "project" && order > $order && slug.current != $slug] | order(order asc) [0] {
      _id, title, "slug": slug.current, client, year, tags, thumbnail
    }`,
    { order: current.order, slug: currentSlug }
  );

  if (next) return next;

  return safeFetch<any>(
    `*[_type == "project" && slug.current != $slug] | order(order asc) [0] {
      _id, title, "slug": slug.current, client, year, tags, thumbnail
    }`,
    { slug: currentSlug }
  );
}

export async function getAllProjectSlugs() {
  return safeFetch<{ slug: string }[]>(
    `*[_type == "project"] { "slug": slug.current }`
  ).then(r => r ?? []);
}

export async function getSiteSettings() {
  return safeFetch<any>(
    `*[_type == "siteSettings"][0] { siteTitle, role, location, showreelUrl, socialLinks, seoDescription, "faviconUrl": favicon.asset->url, "ogImageUrl": ogImage.asset->url }`
  );
}

export async function getHomeGrid() {
  return safeFetch<any>(
    `*[_type == "homeGrid" && _id == "homeGrid"][0] {
      items[defined(project->_id)] {
        _key,
        featured,
        columnStart,
        columnSpan,
        rowStart,
        rowSpan,
        project->{ _id, title, "slug": slug.current, client, year, thumbnail }
      }
    }`
  );
}

export async function getAbout() {
  return safeFetch<any>(
    `*[_type == "about"][0] { bio, photo, skills, cvUrl, brands[] { text, image, link }, recognitions[] { title, url }, metaTitle, metaDescription, "metaImageUrl": metaImage.asset->url }`
  );
}
