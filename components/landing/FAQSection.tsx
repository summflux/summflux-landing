const questions = [
  [
    "A SummFlux substitui meu CRM?",
    "Você pode usar o CRM nativo da SummFlux ou conectar um destino externo. O objetivo é preservar contexto e manter as prioridades coerentes, independentemente do destino.",
  ],
  [
    "A Ary responde qualquer coisa sozinha?",
    "Não. Saudações simples podem usar respostas determinísticas, enquanto intenções comerciais usam contexto. Preço, prazo, disponibilidade, cobertura, garantia e ações sensíveis respeitam os dados e políticas cadastrados.",
  ],
  [
    "Preciso escrever uma descrição longa de cada produto?",
    "Não. Nome, categoria e um resumo podem ser suficientes para ofertas conhecidas. Detalhes adicionais são opcionais e servem quando sua operação tem regras, nomes ou condições específicas.",
  ],
  [
    "Como eu sei por que uma prioridade foi criada?",
    "Os itens importantes mostram a conversa ou fonte de origem, evidências usadas, confiança, data e informação que ainda falta.",
  ],
  [
    "A equipe continua no controle?",
    "Sim. A plataforma separa recomendação, automação e aprovação. Políticas podem impedir ou encaminhar ações sensíveis para uma pessoa.",
  ],
];

export function FAQSection() {
  return (
    <section className="section section--soft">
      <div className="public-container faq-layout">
        <div className="section-heading">
          <span className="eyebrow">Perguntas frequentes</span>
          <h2>Clareza antes de colocar a Ary em produção.</h2>
          <p>O produto foi desenhado para orientar o time sem esconder origem, regra ou risco.</p>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}<span aria-hidden="true">+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
