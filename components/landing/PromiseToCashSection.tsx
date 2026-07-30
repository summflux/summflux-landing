const stages = [
  ["Promessa", "O que foi combinado, com trecho e conversa de origem."],
  ["Execução", "Prazo, responsável, dependências e evidências de entrega."],
  ["Cobrança", "Valor, vencimento e vínculo com a condição negociada."],
  ["Pagamento", "Recebimento confirmado ou desvio que exige ação."],
];

export function PromiseToCashSection() {
  return (
    <section className="section section--contrast">
      <div className="public-container split-layout">
        <div className="section-heading">
          <span className="eyebrow">Promise-to-Cash</span>
          <h2>Uma promessa não termina quando a conversa acaba.</h2>
          <p>
            Acompanhe compromissos assumidos até entrega, cobrança e pagamento. Quando algo
            perde prazo, responsável ou evidência, o Action Center recebe o risco.
          </p>
          <ul className="check-list">
            <li>Promessa detectada com contexto e confiança</li>
            <li>Responsável e prazo explícitos</li>
            <li>Relação com valor, cobrança e pagamento</li>
            <li>Alerta explicável quando o fluxo quebra</li>
          </ul>
        </div>

        <div className="promise-flow" aria-label="Etapas do Promise-to-Cash">
          {stages.map(([title, text], index) => (
            <article key={title}>
              <span>{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {index < stages.length - 1 ? <i aria-hidden="true">↓</i> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
