import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request;
	const accessToken = cookies.get('accessToken');
	const isAuthPage = url.includes('/auth');
	const isCashierPage = url.includes('/cashier');

	if (isAuthPage && accessToken) {
		return NextResponse.redirect(new URL('/', url));
	}

	if (isAuthPage) {
		return NextResponse.next();
	}

	return NextResponse.next();
}
