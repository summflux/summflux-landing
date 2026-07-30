import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("menu móvel é controlado, acessível e bloqueia o scroll de fundo", async () => {
  const header = await read("../components/PublicHeader.tsx");
  const css = await read("../app/globals.css");

  assert.match(header, /aria-expanded=\{open\}/);
  assert.match(header, /aria-controls=\{navigationId\}/);
  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /event\.key !== "Tab"/);
  assert.match(header, /previousFocusRef\.current\?\.focus\(\)/);
  assert.match(header, /navigationRef\.current\?\.querySelector/);
  assert.match(header, /document\.body\.style\.overflow = "hidden"/);
  assert.match(header, /previousOverflow/);
  assert.match(header, /className="site-menu-backdrop"/);
  assert.match(css, /max-height: calc\(100dvh - 66px\)/);
  assert.match(css, /\.site-header\.is-open \.site-navigation/);
  assert.match(css, /\.site-menu-backdrop\s*\{[\s\S]*position: fixed/);
});

test("landing não injeta HTML e as áreas responsivas usam limites fluidos", async () => {
  const page = await read("../app/page.tsx");
  const demo = await read("../components/landing/ProductDemo.tsx");
  const css = await read("../app/globals.css");

  assert.doesNotMatch(page, /dangerouslySetInnerHTML|landingHtml|<Script/);
  assert.match(page, /<ProductDemo \/>/);
  assert.match(demo, /role="tablist"/);
  assert.match(demo, /aria-selected=\{activeView === key\}/);
  assert.match(css, /width: min\(calc\(100% - 24px\), var\(--container\)\)/);
  assert.match(css, /overflow: clip/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
