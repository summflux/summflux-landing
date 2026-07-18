export type BlogTag = { id: number; name: string; slug: string };

export type BlogSitemapEntry = {
  slug: string;
  published_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_html: string;
  cover_image_url: string | null;
  cover_image_alt: string;
  seo_title: string;
  seo_description: string;
  canonical_url: string | null;
  og_image_url: string | null;
  author_name: string;
  category_name: string | null;
  category_slug: string | null;
  tags: BlogTag[];
  featured: boolean;
  noindex: boolean;
  reading_time_minutes: number;
  published_at: string;
  updated_at: string;
};

const DEFAULT_API_BASE = process.env.NODE_ENV === "production"
  ? "https://api.summflux.com/api/public/blog"
  : "http://localhost:3000/api/public/blog";
const API_BASE = (process.env.BLOG_API_BASE_URL || DEFAULT_API_BASE).replace(/\/+$/, "");

async function apiFetch<T>(path: string, options: RequestInit & { next?: { tags?: string[]; revalidate?: number } } = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, options);
  if (!response.ok) throw new Error(`BLOG_API_${response.status}`);
  return response.json() as Promise<T>;
}

export async function getBlogPosts(params: { page?: number; limit?: number; category?: string; featured?: boolean } = {}) {
  const search = new URLSearchParams();
  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.category) search.set("category", params.category);
  if (params.featured !== undefined) search.set("featured", String(params.featured));
  return apiFetch<{ ok: true; data: BlogPost[]; total: number; page: number; limit: number }>(`/posts?${search}`, {
    next: { tags: ["blog-posts"], revalidate: 300 }
  });
}

export async function getBlogPost(slug: string) {
  return apiFetch<{ ok: true; data?: BlogPost; redirect_to?: string }>(`/posts/${encodeURIComponent(slug)}`, {
    next: { tags: ["blog-posts", `blog-post:${slug}`], revalidate: 300 },
    redirect: "manual"
  });
}

export async function getBlogCategories() {
  return apiFetch<{ ok: true; data: Array<{ id: number; name: string; slug: string; posts_count: number }> }>("/categories", {
    next: { tags: ["blog-categories"], revalidate: 900 }
  });
}

export async function getPreviewPost(token: string) {
  if (!token || token.length > 2_048) throw new Error("BLOG_PREVIEW_TOKEN_INVALID");
  return apiFetch<{ ok: true; data: BlogPost }>(`/preview/${encodeURIComponent(token)}`, { cache: "no-store" });
}


export async function getBlogSitemapEntries() {
  return apiFetch<BlogSitemapEntry[]>("/sitemap", {
    cache: "force-cache",
    next: { tags: ["blog-posts", "blog-sitemap"], revalidate: 3600 }
  });
}
