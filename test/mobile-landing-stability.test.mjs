import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("menu móvel preserva scroll e fica ancorado à viewport", async () => {
  const script = await read("../public/assets/js/app.js");
  const css = await read("../app/globals.css");
  const html = await read("../lib/landing-html.ts");

  assert.match(script, /menuScrollY = window\.scrollY/);
  assert.match(script, /document\.body\.style\.position = 'fixed'/);
  assert.match(script, /window\.scrollTo\(\{ top: restoreY/);
  assert.match(script, /header\?\.classList\.toggle\('menu-open'/);
  assert.match(css, /\.site-header\.menu-open/);
  assert.match(css, /max-height: calc\(100dvh - 68px\)/);
  assert.match(html, /aria-controls="site-navigation"/);
  assert.match(html, /id="site-navigation"/);
});

test("demonstração reserva a maior altura e evita salto automático", async () => {
  const script = await read("../public/assets/js/app.js");
  const css = await read("../app/globals.css");

  assert.match(script, /function syncDemoStageHeight\(\)/);
  assert.match(script, /maxHeight = Math\.max\(maxHeight, stage\.scrollHeight\)/);
  assert.match(script, /--demo-stage-height/);
  assert.match(css, /height: var\(--demo-stage-height, auto\)/);
  assert.match(css, /min-height: 535px/);
});
