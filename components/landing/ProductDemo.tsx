"use client";

import { useState } from "react";

const demoViews = {
  prioridades: {
    label: "Prioridades",
    kicker: "Action Center",
    title: "O que exige decisão agora",
    description: "Riscos ordenados por urgência, evidência e impacto financeiro.",
    items: [
      ["Promessa de instalação vence amanhã", "Conversa + proposta + agenda", "R$ 7.200"],
      ["Cliente aceitou, mas não há cobrança", "Aceite identificado há 18 horas", "R$ 3.450"],
      ["Premissa de contratação perdeu força", "Meta abaixo do esperado por 3 semanas", "Revisar"],
    ],
  },
  promessas: {
    label: "Promise-to-Cash",
    kicker: "Da conversa ao caixa",
    title: "Cada compromisso segue até o resultado",
    description: "Prazo, responsável, evidência, risco, cobrança e pagamento no mesmo fluxo.",
    items: [
      ["Enviar proposta até sexta", "Responsável: Marina · Em execução", "No prazo"],
      ["Instalar em 05/08", "Cobrança vinculada · 50% recebido", "R$ 6.000"],
      ["Retornar com condição especial", "Aguardando aprovação de política", "Bloqueado"],
    ],
  },
  decisoes: {
    label: "Reality + Guard",
    kicker: "Decisões protegidas",
    title: "Premissas explícitas antes do investimento",
    description: "Entenda por que uma decisão existe, quando revisar e quando parar.",
    items: [
      ["Contratar novo vendedor", "3 premissas · revisão em 12 dias", "Em teste"],
      ["Ampliar cobertura regional", "Evidência financeira insuficiente", "Atenção"],
      ["Manter desconto de entrada", "Dentro da política aprovada", "Seguro"],
    ],
  },
} as const;

type DemoView = keyof typeof demoViews;

export function ProductDemo() {
  const [activeView, setActiveView] = useState<DemoView>("prioridades");
  const view = demoViews[activeView];

  return (
    <section id="produto" className="section section--product">
      <div className="public-container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">O cérebro operacional da SummFlux</span>
          <h2>Uma fonte de verdade para sinais, promessas, decisões e ações.</h2>
          <p>
            A mesma informação abastece a home, o Action Center, o Reality, o Guard e o
            desempenho. O usuário não precisa escolher em qual tela acreditar.
          </p>
        </div>

        <div className="product-demo">
          <div className="product-demo__tabs" role="tablist" aria-label="Visões do RealityOS">
            {(Object.keys(demoViews) as DemoView[]).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={activeView === key}
                aria-controls="product-demo-panel"
                className={activeView === key ? "is-active" : ""}
                onClick={() => setActiveView(key)}
              >
                {demoViews[key].label}
              </button>
            ))}
          </div>

          <div id="product-demo-panel" className="product-demo__panel" role="tabpanel">
            <div className="product-demo__intro">
              <span>{view.kicker}</span>
              <h3>{view.title}</h3>
              <p>{view.description}</p>
            </div>
            <div className="product-demo__list">
              {view.items.map(([title, evidence, value]) => (
                <article key={title}>
                  <span className="product-demo__marker" aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <small>{evidence}</small>
                  </div>
                  <b>{value}</b>
                  <button type="button" aria-label={`Ver evidências de ${title}`}>Ver evidências</button>
                </article>
              ))}
            </div>
            <div className="product-demo__footer">
              <span>Todos os itens preservam origem, responsável, confiança e histórico.</span>
              <a href="#demonstracao">Ver com os dados da minha operação →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
