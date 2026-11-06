import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  const pathName = request.nextUrl.pathname;

  const { session: data } = await userServices.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  // check if user authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if admin tries to access user dashboard
  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // if user tries to access admin dashboard
  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
