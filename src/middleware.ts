import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const session = cookies.get("session")?.value;

  const isAuthPage = url.includes("/login") || url.includes("/register");

  if (isAuthPage) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/login/:path*",
    "/register",
    "/register/:path*",
  ],
};
