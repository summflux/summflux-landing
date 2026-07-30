const cards = [
  {
    title: "Reality",
    description: "Premissas, evidências, contradições, projetos e fontes em uma memória empresarial viva.",
    items: ["O que sabemos", "Em que evidência confiamos", "O que precisa ser validado"],
  },
  {
    title: "Guard",
    description: "Decisões conectadas às premissas que as sustentam, com revisão e critério de parada.",
    items: ["Custo e resultado esperado", "Data de revisão", "Condição para continuar ou parar"],
  },
  {
    title: "Governança",
    description: "Políticas aplicadas antes de ações sensíveis e aprovações registradas no histórico.",
    items: ["Limites de desconto", "Aprovação humana", "Quem decidiu e por quê"],
  },
];

export function GuardRealitySection() {
  return (
    <section className="section section--soft">
      <div className="public-container">
        <div className="section-heading section-heading--center">
          <span className="eyebrow">Memória, proteção e controle</span>
          <h2>Inteligência que mostra como sabe — e quando não sabe.</h2>
          <p>
            Recomendações importantes permanecem ligadas às evidências e políticas que as originaram.
          </p>
        </div>
        <div className="platform-card-grid">
          {cards.map((card) => (
            <article key={card.title}>
              <span className="platform-card-grid__icon" aria-hidden="true">{card.title.charAt(0)}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <ul>
                {card.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
