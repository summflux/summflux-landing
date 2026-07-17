import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("revalidação do Next valida HMAC, janela temporal e replay", async () => {
  const source = await read("../app/api/revalidate/route.ts");
  assert.match(source, /timingSafeEqual/);
  assert.match(source, /createHmac\("sha256",secret\)/);
  assert.match(source, /seenNonces\.has\(nonce\)/);
  assert.match(source, /5\*60_000/);
  assert.match(source, /revalidateTag\("blog-posts","max"\)/);
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
});

test("landing preservada inclui acesso ao blog no domínio principal", async () => {
  const landing = await read("../lib/landing-html.ts");
  assert.match(landing, /href="\/blog"/);
  assert.match(landing, /SummFlux/);
});
