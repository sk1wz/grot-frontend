import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/shared/lib/session-cookie";

export async function DELETE() {
  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
