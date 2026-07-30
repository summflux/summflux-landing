import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="public-container hero-section__grid">
        <div className="hero-section__copy">
          <span className="eyebrow">RealityOS para operações comerciais</span>
          <h1>Encontre risco e dinheiro perdido entre conversa e pagamento.</h1>
          <p>
            A SummFlux transforma conversas em fatos operacionais: identifica compromissos,
            conecta responsáveis e evidências, prioriza desvios e acompanha cada promessa até
            o resultado financeiro.
          </p>
          <div className="hero-section__actions">
            <a className="button button--primary" href="#demonstracao">Ver na minha operação</a>
            <a className="button button--secondary" href="#produto">Conhecer o RealityOS</a>
          </div>
          <div className="hero-section__trust" aria-label="Princípios do produto">
            <span>Evidências rastreáveis</span>
            <span>Aprovação humana rastreável</span>
            <span>Dados separados por empresa</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Exemplo do Action Center da SummFlux">
          <div className="hero-visual__chrome">
            <span />
            <span />
            <span />
            <strong>Central Comercial do Dia</strong>
          </div>
          <div className="hero-visual__body">
            <aside>
              <b>SummFlux</b>
              <span className="is-active">Prioridades</span>
              <span>Promise-to-Cash</span>
              <span>Reality</span>
              <span>Guard</span>
            </aside>
            <div className="hero-visual__content">
              <div className="mini-heading">
                <div>
                  <small>O QUE EXIGE AÇÃO AGORA</small>
                  <strong>3 prioridades explicáveis</strong>
                </div>
                <span className="status-pill status-pill--ok">Sincronizado</span>
              </div>
              <div className="priority-preview priority-preview--danger">
                <span>Alta</span>
                <div>
                  <strong>Promessa vence hoje sem responsável</strong>
                  <small>Origem: conversa do WhatsApp · Impacto: R$ 4.800</small>
                </div>
                <b>Revisar</b>
              </div>
              <div className="priority-preview">
                <span>Média</span>
                <div>
                  <strong>Proposta aceita sem cobrança vinculada</strong>
                  <small>2 evidências · Próximo passo recomendado</small>
                </div>
                <b>Abrir</b>
              </div>
              <div className="hero-visual__metrics">
                <div><small>Impacto mapeado</small><strong>R$ 18,4 mil</strong></div>
                <div><small>Promessas em risco</small><strong>2</strong></div>
                <div><small>Decisões para revisar</small><strong>1</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="public-container proof-strip">
        <span>RealityOS + Ary</span>
        <span>Promise-to-Cash</span>
        <span>Guard e Governança</span>
        <Link href="/blog">Conteúdo para operações reais →</Link>
      </div>
    </section>
  );
}
