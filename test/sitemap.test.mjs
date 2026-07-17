import assert from "node:assert/strict";
import test from "node:test";
import { access, readFile } from "node:fs/promises";
import { buildSitemapEntries, normalizeSiteUrl } from "../lib/sitemap-utils.mjs";

const staticPages = [
  { path: "/", lastModified: "2026-07-10T10:00:00.000Z" },
  { path: "/tutorial-instalacao.html", lastModified: "2026-07-11T10:00:00.000Z" },
  { path: "/termos.html", lastModified: "2026-07-12T10:00:00.000Z" },
  { path: "/privacidade.html", lastModified: "2026-07-13T10:00:00.000Z" },
  { path: "/exclusao-dados.html", lastModified: "2026-07-14T10:00:00.000Z" }
];

test("sitemap inclui páginas reais, publicados e lastModified real sem duplicação", () => {
  const entries = buildSitemapEntries({
    siteUrl: "http://summflux.com///qualquer-coisa",
    staticPages,
    blogFallbackLastModified: "2026-07-19T10:00:00.000Z",
    articles: [
      { slug: "artigo-publicado", status: "published", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-17T12:00:00.000Z" },
      { slug: "artigo-publicado", status: "published", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-17T11:00:00.000Z" },
      { slug: "rascunho", status: "draft", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-16T10:00:00.000Z" },
      { slug: "agendado-futuro", status: "published", published_at: "2999-01-01T00:00:00.000Z", updated_at: "2999-01-01T00:00:00.000Z" },
      { slug: "sem-index", status: "published", noindex: true, published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-16T10:00:00.000Z" },
      { slug: "excluido", status: "published", deleted_at: "2026-07-17T00:00:00.000Z", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-16T10:00:00.000Z" },
      { slug: "arquivado", status: "archived", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-16T10:00:00.000Z" },
      { slug: "slug inválido", status: "published", published_at: "2026-07-16T10:00:00.000Z", updated_at: "2026-07-16T10:00:00.000Z" }
    ]
  });

  const urls = entries.map((entry) => entry.url);
  assert.ok(urls.includes("https://www.summflux.com/"));
  assert.ok(urls.includes("https://www.summflux.com/blog"));
  assert.ok(urls.includes("https://www.summflux.com/blog/artigo-publicado"));
  assert.ok(urls.includes("https://www.summflux.com/tutorial-instalacao.html"));
  assert.ok(!urls.some((url) => /rascunho|agendado-futuro|sem-index|excluido|arquivado|slug%20inválido/.test(url)));
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => url.startsWith("https://www.summflux.com")));
  assert.equal(entries.find((entry) => entry.url.endsWith("/blog/artigo-publicado")).lastModified.toISOString(), "2026-07-17T12:00:00.000Z");
  assert.equal(entries.find((entry) => entry.url.endsWith("/blog")).lastModified.toISOString(), "2026-07-17T12:00:00.000Z");
});

test("normalização força HTTPS, www e remove barras ou caminhos indevidos", () => {
  assert.equal(normalizeSiteUrl("http://summflux.com////blog?q=1"), "https://www.summflux.com");
  assert.equal(normalizeSiteUrl("https://www.summflux.com/"), "https://www.summflux.com");
  assert.equal(normalizeSiteUrl("valor inválido"), "https://www.summflux.com");
});

test("sitemap usa endpoint leve, cache etiquetado e preserva estáticos em falha", async () => {
  const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const api = await readFile(new URL("../lib/blog-api.ts", import.meta.url), "utf8");
  assert.match(api, /getBlogSitemapEntries/);
  assert.match(api, /"\/sitemap"/);
  assert.match(api, /tags: \["blog-posts", "blog-sitemap"\]/);
  assert.match(api, /revalidate: 3600/);
  assert.match(sitemap, /catch \(error\)/);
  assert.match(sitemap, /Gerado sem artigos/);
  assert.doesNotMatch(sitemap, /priority|changeFrequency|new Date\(\)/);
});

test("revalidação invalida blog, artigo, slug antigo, sitemap e tags compartilhadas", async () => {
  const route = await readFile(new URL("../app/api/revalidate/route.ts", import.meta.url), "utf8");
  assert.match(route, /revalidateTag\("blog-posts", "max"\)/);
  assert.match(route, /revalidateTag\("blog-sitemap", "max"\)/);
  assert.match(route, /revalidateTag\("blog-redirects", "max"\)/);
  assert.match(route, /revalidatePath\("\/blog"\)/);
  assert.match(route, /revalidatePath\(`\/blog\/\$\{payload\.slug\}`\)/);
  assert.match(route, /payload\.previous_slug/);
  assert.match(route, /revalidatePath\("\/sitemap\.xml"\)/);
  assert.match(route, /createHmac\("sha256", secret\)/);
  assert.match(route, /timingSafeEqual/);
  assert.match(route, /RATE_LIMIT/);
  assert.match(route, /seenNonces\.has\(nonce\)/);
  assert.doesNotMatch(route, /searchParams.*secret/);
});

test("robots referencia o sitemap canônico e não bloqueia o blog", async () => {
  const robots = await readFile(new URL("../app/robots.ts", import.meta.url), "utf8");
  assert.match(robots, /sitemap: `\$\{site\}\/sitemap\.xml`/);
  assert.match(robots, /allow: \["\/", "\/blog", "\/blog\/"\]/);
  assert.match(robots, /disallow: \["\/admin", "\/api", "\/preview", "\/blog\/preview"\]/);
});

test("XML estático antigo foi preservado temporariamente fora da pasta public e possui backup", async () => {
  await access(new URL("../sitemap.xml", import.meta.url));
  await assert.rejects(access(new URL("../public/sitemap.xml", import.meta.url)));
  await access(new URL("../_backups/sitemap-static-before-dynamic-2026-07-13.xml", import.meta.url));
});


test("slug antigo usa redirect HTTP 301 antes de renderizar o artigo", async () => {
  const proxy = await readFile(new URL("../proxy.ts", import.meta.url), "utf8");
  assert.match(proxy, /NextResponse\.redirect\(new URL\(`\/blog\/\$\{payload\.redirect_to\}`/);
  assert.match(proxy, /, 301\)/);
  assert.match(proxy, /\/redirects\/\$\{encodeURIComponent\(slug\)\}/);
});
