import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import acceptLanguage from 'accept-language';

import { fallbackLng, languages, i18nCookieName } from '@/utils';

acceptLanguage.languages(languages);

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)'],
};

export const middleware = (req: NextRequest) => {
  let lng;

  const i18nCookie = cookies().get(i18nCookieName);

  if (i18nCookie) {
    lng = acceptLanguage.get(i18nCookie.value);
  }

  if (!lng) {
    lng = acceptLanguage.get(headers().get('Accept-Language'));
  }

  if (!lng) {
    lng = fallbackLng;
  }

  const urlStartWithExistingLng = languages.some((lng) => req.nextUrl.pathname.startsWith(`/${lng}`));
  const urlStartWithNext = req.nextUrl.pathname.startsWith('/_next');

  if (!urlStartWithExistingLng && !urlStartWithNext) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  const refererHeader = headers().get('referer');

  if (refererHeader) {
    const refererUrl = new URL(refererHeader);
    const lngInReferer = languages.find((lng) => refererUrl.pathname.startsWith(`/${lng}`));
    const response = NextResponse.next();

    if (lngInReferer) {
      response.cookies.set(i18nCookieName, lngInReferer);
    }

    return response;
  }

  return NextResponse.next();
};
