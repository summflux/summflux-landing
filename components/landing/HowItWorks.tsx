const steps = [
  {
    number: "01",
    title: "A SummFlux observa",
    text: "Conversas e integrações viram eventos com origem, horário e empresa responsável.",
  },
  {
    number: "02",
    title: "O RealityOS conecta",
    text: "Leads, promessas, decisões, evidências, políticas e ações deixam de viver em telas isoladas.",
  },
  {
    number: "03",
    title: "A Ary orienta e executa",
    text: "A equipe recebe o próximo passo; ações sensíveis respeitam políticas e aprovação humana.",
  },
  {
    number: "04",
    title: "O resultado fecha o ciclo",
    text: "Execução, cobrança e pagamento atualizam a mesma fonte de verdade operacional.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section">
      <div className="public-container">
        <div className="section-heading">
          <span className="eyebrow">Como funciona</span>
          <h2>Da conversa para a realidade operacional.</h2>
          <p>
            Cada sinal importante vira um objeto conectado, com origem, responsável e próximo passo.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
