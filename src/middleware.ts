import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/cart", "/checkout", "/placed"]; 
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // Check if route requires authentication
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Check if route requires admin access
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    
    // For admin routes, we'll do client-side role validation
    // since we can't easily decode JWT in middleware without the secret
    // The admin layout will handle the role checking
  }

  // Additional protection for specific routes
  if (pathname === "/checkout") {
    // Check if user has valid cart items (this will be validated on the client side too)
    const referer = request.headers.get("referer");
    if (!referer || !referer.includes("/cart")) {
      const url = request.nextUrl.clone();
      url.pathname = "/cart";
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/placed") {
    // Check if user came from checkout (payment success)
    const referer = request.headers.get("referer");
    if (!referer || !referer.includes("/checkout")) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/cart/:path*", "/checkout/:path*", "/placed/:path*", "/admin/:path*"],
};
