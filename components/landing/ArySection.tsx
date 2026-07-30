const capabilities = [
  ["Contexto da empresa", "Posicionamento, área atendida, tom e regras da operação."],
  ["Memória comercial", "Produtos simples ou detalhados conforme a necessidade real."],
  ["Conversa humana", "Saudações simples não consomem IA; intenção comercial recebe contexto."],
  ["Decisão explicável", "A equipe vê evidências, ferramenta usada, confiança e o que faltou."],
];

export function ArySection() {
  return (
    <section id="ary" className="section">
      <div className="public-container ary-layout">
        <div className="ary-conversation" aria-label="Exemplo de conversa com a Ary">
          <div className="ary-conversation__head">
            <span>A</span>
            <div><strong>Ary</strong><small>Atendimento ativo</small></div>
          </div>
          <div className="message message--incoming">Oi, tudo bem?</div>
          <div className="message message--ary">
            Olá! Tudo bem por aqui. Sou a Ary, assistente da EletriCasa. Como posso ajudar hoje?
            <small>Resposta automática · sem consumo de IA</small>
          </div>
          <div className="message message--incoming">
            Preciso revisar a instalação elétrica de uma loja. Vocês atendem no Centro?
          </div>
          <div className="message message--ary">
            Atendemos a região central, sim. Para entender o serviço: é uma revisão preventiva
            ou existe algum problema acontecendo agora?
            <small>Empresa + serviço + área atendida</small>
          </div>
        </div>

        <div>
          <div className="section-heading">
            <span className="eyebrow">Ary, a interface inteligente</span>
            <h2>Humana na conversa. Segura antes de prometer.</h2>
            <p>
              A Ary usa o contexto da empresa e aprende o nível de detalhe necessário para cada
              oferta. Ela não exige que o usuário explique o óbvio e não inventa preço, prazo,
              estoque, cobertura ou garantia.
            </p>
          </div>
          <div className="capability-list">
            {capabilities.map(([title, text]) => (
              <article key={title}>
                <span aria-hidden="true">✓</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
