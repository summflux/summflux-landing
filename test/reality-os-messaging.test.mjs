import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

test("landing posiciona a SummFlux como RealityOS sem apagar a Ary", () => {
  assert.match(page, /RealityOS para operações comerciais/);
  assert.match(page, /conversas, promessas, execução e pagamento/);
  assert.match(page, /Promise-to-Cash/);
  assert.match(page, /Guard para decisões/);
  assert.match(page, /Action Center/);
  assert.match(page, /RealityOS \+ Ary/);
  assert.match(layout, /SummFlux RealityOS/);
  assert.match(layout, /Ary AI/);
});

test("mensagem pública não promete previsão absoluta ou automação sem controle", () => {
  assert.doesNotMatch(page, /garantia de resultado|100% automático|sem intervenção humana/i);
  assert.match(page, /aprovação humana rastreável/);
  assert.match(page, /Evidências rastreáveis/);
});
