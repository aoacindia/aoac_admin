import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/api/auth"];

const authRoutes = ["/login"];

const roleBasedRoutes: Record<string, string[]> = {
  "/dashboard/users": ["ADMIN"],
  "/dashboard/users/create": ["ADMIN"],
  "/dashboard/products/categories": ["ADMIN", "MANAGER"],
  "/dashboard/products/create": ["ADMIN", "MANAGER"],
  "/dashboard/products/[id]/edit": ["ADMIN", "MANAGER"],
  "/dashboard/products/discounts": ["ADMIN", "MANAGER"],
  "/dashboard/customers": ["ADMIN", "MANAGER"],
};

function hasRoleAccess(pathname: string, userRole?: string | null) {
  const role = userRole?.toUpperCase();
  for (const [routePrefix, roles] of Object.entries(roleBasedRoutes)) {
    if (pathname.startsWith(routePrefix)) {
      return Boolean(role && roles.includes(role));
    }
  }
  return true;
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

  if (pathname.startsWith("/api") && !pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const session = await auth();
  const isAuthenticated = Boolean(session);
  const userRole = session?.user?.role ?? null;

  if (isAuthenticated) {
    if (!hasRoleAccess(pathname, userRole)) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard/unauthorized";
      return NextResponse.redirect(url);
    }

    if (authRoutes.some((route) => pathname.startsWith(route))) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
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

