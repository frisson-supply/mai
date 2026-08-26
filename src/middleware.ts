import { defineMiddleware } from 'astro:middleware';

const COOKIE_NAME = 'site-gate';
const COOKIE_VALUE = 'unlocked';

// ponytail: no admin toggle, unsetting SITE_GATE_PASSWORD disables this entirely
export const onRequest = defineMiddleware((context, next) => {
  const password = import.meta.env.SITE_GATE_PASSWORD;

  if (!password) return next();

  const { pathname } = context.url;

  if (
    pathname.startsWith('/studio') ||
    pathname.startsWith('/api/') ||
    pathname === '/gate' ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/favicon')
  ) {
    return next();
  }

  if (context.cookies.get(COOKIE_NAME)?.value === COOKIE_VALUE) {
    return next();
  }

  return context.redirect(`/gate?next=${encodeURIComponent(pathname + context.url.search)}`);
});
