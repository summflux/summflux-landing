import Image from "next/image";
import Link from "next/link";
export function PublicHeader() {
  return <header className="blog-header"><div className="blog-container blog-nav">
    <Link href="/" aria-label="SummFlux — página inicial"><Image src="/assets/images/summflux-black.png" alt="SummFlux" width={178} height={42} priority /></Link>
    <nav className="blog-nav-links" aria-label="Navegação principal"><Link href="/">Produto</Link><Link href="/blog">Blog</Link><a href="https://app.summflux.com/">Entrar</a><Link className="blog-nav-cta" href="/#demonstracao">Ver a Ary em ação</Link></nav>
  </div></header>;
}
