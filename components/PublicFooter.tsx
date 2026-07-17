import Image from "next/image";
import Link from "next/link";
export function PublicFooter(){return <footer className="blog-footer"><div className="blog-container blog-footer-grid"><div><Image src="/assets/images/summflux-white.png" alt="SummFlux" width={178} height={42}/><p>Inteligência comercial para conversas, oportunidades e decisões.</p></div><div><Link href="/blog">Blog</Link><a href="/privacidade.html">Privacidade</a><a href="/termos.html">Termos</a></div></div></footer>}
