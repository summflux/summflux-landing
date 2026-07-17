import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicFooter } from "../../../components/PublicFooter";
import { PublicHeader } from "../../../components/PublicHeader";
import { getPreviewPost } from "../../../lib/blog-api";
export const metadata:Metadata={title:"Preview do artigo",robots:{index:false,follow:false,nocache:true}};
export default async function PreviewPage({searchParams}:{searchParams:Promise<{token?:string}>}){const {token}=await searchParams;if(!token)notFound();let post;try{post=(await getPreviewPost(token)).data;}catch{return notFound();}return <div className="blog-body"><PublicHeader/><div className="preview-banner">Preview privado · este endereço expira e não é indexado.</div><main className="article-shell"><article><header className="article-header"><div className="article-breadcrumb"><Link href="/blog">Blog</Link><span>›</span><span>Preview</span></div><span className="blog-category">{post.category_name||"Rascunho"}</span><h1>{post.title||"Artigo sem título"}</h1><p className="article-excerpt">{post.excerpt}</p><div className="article-meta"><span>{post.author_name}</span><span>·</span><span>{post.reading_time_minutes} min de leitura</span></div></header>{post.cover_image_url&&<Image className="article-cover" src={post.cover_image_url} alt={post.cover_image_alt} width={1120} height={630} priority unoptimized/>}<div className="article-content" dangerouslySetInnerHTML={{__html:post.content_html}}/></article></main><PublicFooter/></div>}
