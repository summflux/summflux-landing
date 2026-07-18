import crypto from "node:crypto";
import type { MetadataRoute } from "next";
import { getBlogSitemapEntries } from "../lib/blog-api";
import { buildSitemapEntries, normalizeSiteUrl } from "../lib/sitemap-utils.mjs";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

const STATIC_PAGES = [
  { path: "/", lastModified: "2026-07-17T07:29:04.000Z" },
  { path: "/tutorial-instalacao.html", lastModified: "2026-07-17T07:29:04.000Z" },
  { path: "/termos.html", lastModified: "2026-07-17T07:29:04.000Z" },
  { path: "/privacidade.html", lastModified: "2026-07-17T07:29:04.000Z" },
  { path: "/exclusao-dados.html", lastModified: "2026-07-17T07:29:04.000Z" }
] as const;
const BLOG_PAGE_LAST_MODIFIED = "2026-07-17T07:29:03.000Z";
const SITEMAP_FAILURE_LOG_INTERVAL_MS = 60_000;
let lastSitemapFailureLoggedAt = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  let articles: Awaited<ReturnType<typeof getBlogSitemapEntries>> = [];

  try {
    articles = await getBlogSitemapEntries();
  } catch (error) {
    const now = Date.now();
    if (now - lastSitemapFailureLoggedAt >= SITEMAP_FAILURE_LOG_INTERVAL_MS) {
      lastSitemapFailureLoggedAt = now;
      process.stderr.write(`${JSON.stringify({
        timestamp: new Date(now).toISOString(),
        level: "warn",
        event: "blog.sitemap_api_unavailable",
        diagnostic_code: `SITEMAP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        error_code: error instanceof Error ? error.name : "BLOG_API_UNAVAILABLE"
      })}\n`);
    }
  }

  return buildSitemapEntries({
    siteUrl,
    staticPages: [...STATIC_PAGES],
    articles,
    blogFallbackLastModified: BLOG_PAGE_LAST_MODIFIED
  });
}
