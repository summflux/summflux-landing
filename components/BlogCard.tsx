import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../lib/blog-api";
function formatDate(value:string){return new Intl.DateTimeFormat("pt-BR",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(value));}
export function BlogCard({post}:{post:BlogPost}){return <Link className="blog-card" href={`/blog/${post.slug}`}><div>{post.cover_image_url?<Image src={post.cover_image_url} alt={post.cover_image_alt} width={800} height={450} unoptimized/>:<div style={{aspectRatio:"16/9",background:"#f1f5f9"}}/>}</div><div className="blog-card-content"><span className="blog-category">{post.category_name||"Inteligência comercial"}</span><h3>{post.title}</h3><p>{post.excerpt}</p><div className="blog-card-meta">{formatDate(post.published_at)} · {post.reading_time_minutes} min de leitura</div></div></Link>}
