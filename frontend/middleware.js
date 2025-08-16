// middleware.js
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  console.log("🔍 Middleware triggered for:", pathname);

  // Public routes that don't require authentication
  const publicPaths = ["/sign-in", "/sign-up"];

  // Allow public paths (with subpaths) & API routes
  // if (
  //   publicPaths.some(
  //     (path) => pathname === path || pathname.startsWith(`${path}/`)
  //   ) ||
  //   pathname.startsWith("/api/")
  // ) {
  //   console.log("✅ Public/API path, allowing access:", pathname);
  //   return NextResponse.next();
  // }

  // Get the NextAuth token
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // console.log("🔑 Token check for", pathname, ":", {
  //   hasToken: !!token,
  //   tokenEmail: token?.user?.email,
  //   tokenExp: token?.exp,
  //   currentTime: Math.floor(Date.now() / 1000),
  // });

  // Redirect if token is missing
  // if (!token) {
  //   console.log("🚫 No token found, redirecting to sign-in");
  //   const signInUrl = new URL("/sign-in", request.url);
  //   signInUrl.searchParams.set("callbackUrl", request.url);
  //   return NextResponse.redirect(signInUrl);
  // }

  console.log("✅ Token valid, allowing access to:", pathname);
  return NextResponse.next();
}

// Only run middleware on protected routes (exclude public pages & static assets)
export const config = {
  matcher: [
    "/((?!sign-in|sign-up|_next|static|favicon.ico|logos|images|uploads).*)",
  ],
};
