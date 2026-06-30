import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseURL } from "@/shared/api/config";

async function isSessionValid(request: NextRequest): Promise<boolean> {
  const cookie = request.headers.get("cookie");
  if (!cookie) {
    return false;
  }

  try {
    const response = await fetch(`${baseURL}/user/me`, {
      method: "GET",
      headers: {
        cookie,
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/register");
  const isDashboard = pathname.includes("/dashboard");
  const hasSession = Boolean(session);

  if (isDashboard && !hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isDashboard && hasSession) {
    const isValid = await isSessionValid(request);
    if (!isValid) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthPage && hasSession) {
    const isValid = await isSessionValid(request);
    if (!isValid) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
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
