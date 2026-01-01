import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // - … SEO routes: `/rss`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`
  matcher: '/((?!api|trpc|_next|_vercel|rss|sitemap\\.xml|robots\\.txt|llms\\.txt|.*\\..*).*)'
};
