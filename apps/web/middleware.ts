import i18nConfig from '@/i18nConfig';
import { i18nRouter } from 'next-i18n-router';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const url = request.nextUrl.clone();

	if (url.pathname.startsWith('/funnel')) {
		const step = url.searchParams.get('step');
		const referer = request.headers.get('referer');

		if ((!referer || !referer.includes('/funnel')) && step !== 'register') {
			url.searchParams.set('step', 'register');
			return NextResponse.redirect(url);
		}
	}

	const i18nResponse = i18nRouter(request, i18nConfig);
	if (i18nResponse) {
		return i18nResponse;
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|static|.*\\..*|_next).*)', '/funnel/:path*'],
};
