// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("🔍 Middleware triggered for:", request.nextUrl.pathname);
  // Always allow access to all routes
  return NextResponse.next();
}

// Match everything, but just pass through
export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico).*)", // still avoids static asset processing
  ],
};
