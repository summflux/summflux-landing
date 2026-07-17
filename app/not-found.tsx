import Link from "next/link";
import { PublicHeader } from "../components/PublicHeader";
export default function NotFound(){return <div className="blog-body"><PublicHeader/><main className="blog-empty-public" style={{margin:"80px auto",maxWidth:720}}><h1>Página não encontrada</h1><p>O conteúdo pode ter sido removido ou o endereço está incorreto.</p><Link href="/blog">Voltar ao blog</Link></main></div>}
