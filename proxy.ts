import { auth } from "@/auth";
import { permissionForPath } from "@/lib/permissions";
import { hasPermission } from "@/lib/permissions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPrefixes = ["/login", "/api/auth"];

function isPublicPath(pathname: string) {
  return publicPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.includes(".") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();
  const isAuthenticated = Boolean(session?.user?.id && session.user.role);

  if (pathname.startsWith("/api")) {
    if (!isAuthenticated) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" || pathname.startsWith("/login/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  const required = permissionForPath(pathname);
  if (required && !hasPermission(session?.user?.role, required)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard/unauthorized";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/api/:path*",
  ],
};
