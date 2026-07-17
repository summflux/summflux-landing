import type { MetadataRoute } from "next";
import { normalizeSiteUrl } from "../lib/sitemap-utils.mjs";

export default function robots(): MetadataRoute.Robots {
  const site = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/blog", "/blog/"],
      disallow: ["/admin", "/api", "/preview", "/blog/preview"]
    },
    sitemap: `${site}/sitemap.xml`,
    host: site
  };
}
