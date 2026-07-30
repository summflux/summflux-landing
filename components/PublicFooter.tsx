import Image from "next/image";
import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-container public-footer__grid">
        <div className="public-footer__brand">
          <Link href="/" aria-label="SummFlux — página inicial">
            <Image src="/assets/images/summflux-white.png" alt="SummFlux" width={178} height={42} />
          </Link>
          <p>
            RealityOS comercial para conectar conversas, promessas, decisões, execução,
            cobrança e resultado — com a Ary como interface inteligente.
          </p>
        </div>

        <div>
          <strong>Produto</strong>
          <Link href="/#produto">RealityOS</Link>
          <Link href="/#ary">Ary</Link>
          <Link href="/#planos">Planos</Link>
        </div>

        <div>
          <strong>Conteúdo</strong>
          <Link href="/blog">Blog</Link>
          <a href="/tutorial-instalacao.html">Tutorial</a>
          <a href="https://app.summflux.com/">Entrar</a>
        </div>

        <div>
          <strong>Legal</strong>
          <a href="/privacidade.html">Privacidade</a>
          <a href="/termos.html">Termos</a>
          <a href="/exclusao-dados.html">Exclusão de dados</a>
        </div>
      </div>

      <div className="public-container public-footer__bottom">
        <span>© {new Date().getFullYear()} SummFlux.</span>
        <span>Decisões comerciais com contexto e evidência.</span>
      </div>
    </footer>
  );
}
