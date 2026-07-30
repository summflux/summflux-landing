import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const landingSources = await Promise.all([
  read("../app/page.tsx"),
  read("../components/landing/HeroSection.tsx"),
  read("../components/landing/ProductDemo.tsx"),
  read("../components/landing/PromiseToCashSection.tsx"),
  read("../components/landing/ArySection.tsx"),
  read("../components/landing/GuardRealitySection.tsx"),
]);
const landing = landingSources.join("\n");
const layout = await read("../app/layout.tsx");

test("landing posiciona a SummFlux como RealityOS sem apagar a Ary", () => {
  assert.match(landing, /RealityOS para operações comerciais/);
  assert.match(landing, /conversa e pagamento/);
  assert.match(landing, /Promise-to-Cash/);
  assert.match(landing, /Guard/);
  assert.match(landing, /Action Center/);
  assert.match(landing, /RealityOS \+ Ary/);
  assert.match(layout, /SummFlux RealityOS/);
  assert.match(layout, /Ary AI/);
});

test("mensagem pública não promete previsão absoluta ou automação sem controle", () => {
  assert.doesNotMatch(landing, /garantia de resultado|100% automático|sem intervenção humana/i);
  assert.match(landing, /aprovação humana rastreável/i);
  assert.match(landing, /Evidências rastreáveis/);
  assert.match(landing, /não inventa preço, prazo/);
});
