import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { NextRequest, NextResponse } from "next/server";
import { PAGES } from "./config";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { url, cookies } = request;
  const accessToken = cookies.get("accessToken");
  const isAuthPage = url.includes("/auth");
  const isShiftPage = url.includes("/shift");

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  if (isAuthPage) {
    return NextResponse.next();
  }

  if (isShiftPage && !accessToken) {
    return NextResponse.redirect(new URL("/auth", url));
  }

  if (parseUrl(url).pathname === PAGES.ADMIN) {
    return NextResponse.redirect(new URL("/admin/statistics", url));
  }
  return NextResponse.next();
}
