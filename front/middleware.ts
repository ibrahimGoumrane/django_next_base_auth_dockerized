import { NextRequest, NextResponse } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  // Add other protected routes
];

// Define auth routes that should redirect to dashboard if user is already logged in
const authRoutes = [
  "/auth/login",
  "/auth/signup",
  // Add other auth routes
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check authentication by looking for the session cookie directly
  const sessionCookie = request.cookies.get("sessionid");
  const isAuthenticated = !!sessionCookie; // User is authenticated if they have a session cookie

  // Create a response object that we'll use for redirects if needed
  const response = NextResponse.next();

  // Check if user is trying to access a protected route without being authenticated
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    const url = new URL("/auth/login", request.url);
    // Add the original URL as a query param to redirect back after login
    url.searchParams.set("returnUrl", pathname);

    return NextResponse.redirect(url);
  }

  // Check if authenticated user is trying to access auth routes
  if (authRoutes.some((route) => pathname === route) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Special handling for the root route
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    // Apply to all routes except public assets
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
