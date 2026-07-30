const plans = [
  {
    name: "Starter",
    price: "R$ 69,90",
    suffix: "/mês",
    description: "Para estruturar o atendimento e começar a operar com contexto.",
    features: ["300 análises por mês", "1 usuário", "CRM e pipeline", "WhatsApp Web assistido"],
  },
  {
    name: "Pro",
    price: "R$ 199,90",
    suffix: "/mês",
    description: "Para times que precisam conectar canais, prioridades e execução.",
    features: ["1.200 análises por mês", "Até 5 usuários", "RealityOS e Ary", "Gmail e integrações avançadas"],
    featured: true,
  },
  {
    name: "Business",
    price: "R$ 499,90",
    suffix: "/mês",
    description: "Para operações com mais volume, controle e governança.",
    features: ["5.000 análises por mês", "Até 15 usuários", "Guard e Governança", "Filas e diagnósticos operacionais"],
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    suffix: "",
    description: "Para arquitetura, volume e políticas específicas.",
    features: ["Capacidade sob medida", "Implantação assistida", "Integrações dedicadas", "Acordos comerciais específicos"],
  },
];

export function PricingSection() {
  return (
    <section id="planos" className="section">
      <div className="public-container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Planos transparentes</span>
          <h2>Comece com a operação que você tem hoje.</h2>
          <p>Usuário adicional: R$ 29,90/mês. Cada pessoa recebe acesso individual ao workspace.</p>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={plan.featured ? "is-featured" : ""} key={plan.name}>
              {plan.featured ? <span className="pricing-grid__badge">Mais escolhido</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="pricing-grid__price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a className={`button ${plan.featured ? "button--primary" : "button--secondary"}`} href="#demonstracao">
                {plan.name === "Enterprise" ? "Falar com especialista" : "Quero conhecer"}
              </a>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Limites e integrações podem evoluir conforme o plano. A configuração final é exibida
          antes da contratação.
        </p>
      </div>
    </section>
  );
}
