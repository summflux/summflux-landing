import { NextRequest, NextResponse } from "next/server";

const DEFAULT_API_BASE = process.env.NODE_ENV === "production"
  ? "https://api.summflux.com/api/public/blog"
  : "http://localhost:3000/api/public/blog";
const API_BASE = (process.env.BLOG_API_BASE_URL || DEFAULT_API_BASE).replace(/\/+$/, "");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  if (parts.length !== 2 || parts[0] !== "blog" || parts[1] === "preview" || !SLUG_PATTERN.test(parts[1])) {
    return NextResponse.next();
  }

  const slug = parts[1];
  try {
    const response = await fetch(`${API_BASE}/redirects/${encodeURIComponent(slug)}`, {
      cache: "force-cache",
      next: { tags: ["blog-redirects", `blog-post:${slug}`], revalidate: 300 }
    });
    if (!response.ok) return NextResponse.next();
    const payload = await response.json() as { redirect_to?: string };
    if (!payload.redirect_to || !SLUG_PATTERN.test(payload.redirect_to) || payload.redirect_to === slug) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(`/blog/${payload.redirect_to}`, request.url), 301);
  } catch {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/blog/:path*"]
};
