import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("revalidação do Next valida HMAC, janela temporal e replay", async () => {
  const source = await read("../app/api/revalidate/route.ts");
  assert.match(source, /timingSafeEqual/);
  assert.match(source, /createHmac\("sha256",\s*secret\)/);
  assert.match(source, /seenNonces\.has\(nonce\)/);
  assert.match(source, /5\s*\*\s*60_000/);
  assert.match(source, /Buffer\.byteLength\(body, "utf8"\)/);
  assert.match(source, /MAX_TRACKED_CLIENTS/);
  assert.match(source, /MAX_TRACKED_NONCES/);
  assert.match(source, /revalidateTag\("blog-posts",\s*"max"\)/);
  assert.doesNotMatch(source, /searchParams.*secret/);
});

test("preview é noindex e usa API privada sem cache", async () => {
  const preview = await read("../app/blog/preview/page.tsx");
  const api = await read("../lib/blog-api.ts");
  assert.match(preview, /robots:\{index:false,follow:false,nocache:true\}/);
  assert.match(api, /\/preview\/\$\{encodeURIComponent\(token\)\}/);
  assert.match(api, /cache: "no-store"/);
});

test("artigo entrega metadata, canonical, JSON-LD e HTML sanitizado pelo backend", async () => {
  const article = await read("../app/blog/[slug]/page.tsx");
  assert.match(article, /generateMetadata/);
  assert.match(article, /BlogPosting/);
  assert.match(article, /BreadcrumbList/);
  assert.match(article, /canonical/);
  assert.match(article, /post\.content_html/);
  assert.match(article, /serializeJsonLd/);
  assert.match(article, /replace\(\/<\//);
});

test("landing preservada inclui acesso ao blog no domínio principal", async () => {
  const landing = await read("../lib/landing-html.ts");
  assert.match(landing, /href="\/blog"/);
  assert.match(landing, /SummFlux/);
});

test("landing informa contratação de usuário adicional e workspace individual", async () => {
  const page = await read("../app/page.tsx");
  assert.match(page, /R\$ 29,90\/mês, contratado pelo dashboard/);
  assert.match(page, /workspace individual/);
});

test("produção entrega CSP, HSTS e proteção contra framing", async () => {
  const config = await read("../next.config.ts");
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /Strict-Transport-Security/);
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /form-action 'self' https:\/\/formspree\.io/);
  assert.match(config, /X-Frame-Options/);
});

test("falha do sitemap gera log estruturado limitado e sem mensagem externa", async () => {
  const sitemap = await read("../app/sitemap.ts");
  assert.match(sitemap, /SITEMAP_FAILURE_LOG_INTERVAL_MS/);
  assert.match(sitemap, /process\.stderr\.write/);
  assert.match(sitemap, /blog\.sitemap_api_unavailable/);
  assert.doesNotMatch(sitemap, /error\.message/);
  assert.doesNotMatch(sitemap, /console\./);
});
