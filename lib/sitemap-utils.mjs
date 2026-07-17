const CANONICAL_HOST = "www.summflux.com";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function normalizeSiteUrl(value) {
  let parsed;
  try {
    parsed = new URL(String(value || "https://www.summflux.com"));
  } catch {
    parsed = new URL("https://www.summflux.com");
  }

  parsed.protocol = "https:";
  parsed.hostname = CANONICAL_HOST;
  parsed.port = "";
  parsed.pathname = "/";
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/+$/, "");
}

export function canonicalSitemapUrl(siteUrl, path) {
  const site = normalizeSiteUrl(siteUrl);
  const normalizedPath = path === "/" ? "/" : `/${String(path || "").replace(/^\/+|\/+$/g, "")}`;
  return normalizedPath === "/" ? `${site}/` : `${site}${normalizedPath}`;
}

export function isValidBlogSlug(value) {
  return SLUG_PATTERN.test(String(value || ""));
}

export function parseSitemapDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

function latestDate(left, right) {
  if (!left) return right || null;
  if (!right) return left;
  return left.getTime() >= right.getTime() ? left : right;
}

export function buildSitemapEntries({ siteUrl, staticPages, articles, blogFallbackLastModified }) {
  const site = normalizeSiteUrl(siteUrl);
  const now = Date.now();
  const entries = new Map();

  const add = (path, lastModified) => {
    const date = parseSitemapDate(lastModified);
    if (!date) return;
    const url = canonicalSitemapUrl(site, path);
    const current = entries.get(url);
    if (!current || current.lastModified.getTime() < date.getTime()) {
      entries.set(url, { url, lastModified: date });
    }
  };

  for (const page of staticPages || []) add(page.path, page.lastModified);

  let latestArticleLastModified = null;
  for (const article of articles || []) {
    if (!isValidBlogSlug(article?.slug)) continue;
    if (article?.status && article.status !== "published") continue;
    if (article?.noindex === true || article?.deleted_at) continue;

    const publishedAt = parseSitemapDate(article?.published_at);
    if (!publishedAt || publishedAt.getTime() > now) continue;
    const updatedAt = parseSitemapDate(article?.updated_at);
    const articleLastModified = updatedAt || publishedAt;

    add(`/blog/${article.slug}`, articleLastModified);
    latestArticleLastModified = latestDate(latestArticleLastModified, articleLastModified);
  }

  add("/blog", latestArticleLastModified || blogFallbackLastModified);
  return [...entries.values()].sort((a, b) => a.url.localeCompare(b.url));
}
