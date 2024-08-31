import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	// Store current request url in a custom header, which you can read later

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-pathname", request.nextUrl.pathname);

	const currentUser = request.cookies.get("session")?.value;

	if (currentUser && !request.nextUrl.pathname.startsWith("/")) {
		return Response.redirect(new URL("/", request.url));
	}

	if (!currentUser && !request.nextUrl.pathname.startsWith("/login")) {
		return Response.redirect(new URL("/login", request.url));
	}

	return NextResponse.next({
		request: {
			// Apply new request headers
			headers: requestHeaders,
		},
	});
}
