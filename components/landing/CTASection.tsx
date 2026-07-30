export function CTASection() {
  return (
    <section id="demonstracao" className="cta-section">
      <div className="public-container cta-section__card">
        <div>
          <span className="eyebrow">Demonstração direcionada</span>
          <h2>Veja onde sua operação perde contexto entre promessa, execução e dinheiro.</h2>
          <p>
            Conte rapidamente como seu time vende hoje. A demonstração usa um cenário próximo
            da sua realidade, sem promessa de automação irrestrita.
          </p>
        </div>
        <div className="cta-section__actions">
          <a
            className="button button--light"
            href="https://wa.me/5521997560069?text=Quero%20ver%20uma%20demonstra%C3%A7%C3%A3o%20da%20SummFlux"
            target="_blank"
            rel="noreferrer"
          >
            Conversar pelo WhatsApp
          </a>
          <a className="button button--ghost-light" href="mailto:contato@summflux.com">
            contato@summflux.com
          </a>
        </div>
      </div>
    </section>
  );
}
