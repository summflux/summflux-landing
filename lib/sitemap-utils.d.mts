export type SitemapArticleInput = {
  slug?: string | null;
  published_at?: string | Date | null;
  updated_at?: string | Date | null;
  status?: string | null;
  noindex?: boolean;
  deleted_at?: string | Date | null;
};

export type SitemapEntry = { url: string; lastModified: Date };

export function normalizeSiteUrl(value?: string | null): string;
export function canonicalSitemapUrl(siteUrl: string, path: string): string;
export function isValidBlogSlug(value?: string | null): boolean;
export function parseSitemapDate(value?: string | Date | null): Date | null;
export function buildSitemapEntries(input: {
  siteUrl?: string | null;
  staticPages: Array<{ path: string; lastModified: string | Date }>;
  articles: SitemapArticleInput[];
  blogFallbackLastModified: string | Date;
}): SitemapEntry[];
