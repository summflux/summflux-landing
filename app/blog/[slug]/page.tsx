import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { PublicFooter } from "../../../components/PublicFooter";
import { PublicHeader } from "../../../components/PublicHeader";
import { getBlogPost } from "../../../lib/blog-api";

function formatDate(value:string){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"long",year:"numeric"}).format(new Date(value));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  try{
    const result=await getBlogPost(slug);
    if(result.redirect_to) return {};
    const post=result.data;
    if(!post) return {};
    return {
      title:post.seo_title||post.title,
      description:post.seo_description||post.excerpt,
      alternates:{canonical:post.canonical_url||`/blog/${post.slug}`},
      robots:{index:!post.noindex,follow:!post.noindex},
      openGraph:{type:"article",title:post.seo_title||post.title,description:post.seo_description||post.excerpt,url:`/blog/${post.slug}`,images:post.og_image_url||post.cover_image_url?[{url:post.og_image_url||post.cover_image_url||"",alt:post.cover_image_alt}]:[],publishedTime:post.published_at,modifiedTime:post.updated_at,authors:[post.author_name]},
      twitter:{card:"summary_large_image",title:post.seo_title||post.title,description:post.seo_description||post.excerpt,images:post.og_image_url||post.cover_image_url?[post.og_image_url||post.cover_image_url||""]:[]}
    };
  }catch{return {};}
}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  let result;
  try{result=await getBlogPost(slug);}catch{return notFound();}
  if(result.redirect_to) permanentRedirect(`/blog/${result.redirect_to}`);
  const post=result.data;
  if(!post) notFound();
  const site=process.env.NEXT_PUBLIC_SITE_URL||"https://www.summflux.com";
  const jsonLd={"@context":"https://schema.org","@type":"BlogPosting",headline:post.title,description:post.excerpt,datePublished:post.published_at,dateModified:post.updated_at,author:{"@type":"Organization",name:post.author_name},publisher:{"@type":"Organization",name:"SummFlux",logo:{"@type":"ImageObject",url:`${site}/assets/icons/st-logo.png`}},mainEntityOfPage:`${site}/blog/${post.slug}`,image:post.og_image_url||post.cover_image_url||undefined};
  const breadcrumbLd={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Início",item:site},{"@type":"ListItem",position:2,name:"Blog",item:`${site}/blog`},{"@type":"ListItem",position:3,name:post.title,item:`${site}/blog/${post.slug}`}]};
  return <div className="blog-body"><PublicHeader/><main className="article-shell"><article><header className="article-header"><div className="article-breadcrumb"><Link href="/">Início</Link><span>›</span><Link href="/blog">Blog</Link><span>›</span><span>{post.category_name||"Artigo"}</span></div><span className="blog-category">{post.category_name||"Inteligência comercial"}</span><h1>{post.title}</h1><p className="article-excerpt">{post.excerpt}</p><div className="article-meta"><span>Por {post.author_name}</span><span>·</span><time dateTime={post.published_at}>{formatDate(post.published_at)}</time><span>·</span><span>{post.reading_time_minutes} min de leitura</span></div></header>{post.cover_image_url&&<Image className="article-cover" src={post.cover_image_url} alt={post.cover_image_alt} width={1120} height={630} priority unoptimized/>}<div className="article-content" dangerouslySetInnerHTML={{__html:post.content_html}}/><aside className="article-cta"><h2>Transforme conversas em decisões comerciais melhores.</h2><p>Veja como a Ary organiza contexto, qualifica oportunidades e mantém o CRM útil para o time.</p><Link href="/#demonstracao">Ver a Ary em ação</Link></aside></article></main><PublicFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/></div>;
}
