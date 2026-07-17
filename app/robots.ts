import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{const site=process.env.NEXT_PUBLIC_SITE_URL||"https://www.summflux.com";return {rules:{userAgent:"*",allow:"/",disallow:["/api/","/blog/preview"]},sitemap:`${site}/sitemap.xml`,host:site};}
