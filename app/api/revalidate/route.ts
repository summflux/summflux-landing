import crypto from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const seenNonces=new Map<string,number>();
function cleanup(now:number){for(const [nonce,expires] of seenNonces)if(expires<=now)seenNonces.delete(nonce);}
function safeEqual(left:string,right:string){const a=Buffer.from(left,"hex"),b=Buffer.from(right,"hex");return a.length===b.length&&a.length>0&&crypto.timingSafeEqual(a,b);}
export async function POST(request:NextRequest){
  const secret=process.env.BLOG_REVALIDATION_SECRET;
  if(!secret)return NextResponse.json({ok:false,error:"Revalidação não configurada."},{status:503});
  const timestamp=request.headers.get("x-summflux-timestamp")||"";const nonce=request.headers.get("x-summflux-nonce")||"";const signature=request.headers.get("x-summflux-signature")||"";const body=await request.text();const now=Date.now();cleanup(now);
  if(!/^\d{13}$/.test(timestamp)||Math.abs(now-Number(timestamp))>5*60_000||!/^[a-f0-9-]{20,80}$/i.test(nonce)||seenNonces.has(nonce))return NextResponse.json({ok:false,error:"Assinatura expirada ou repetida."},{status:401});
  const expected=crypto.createHmac("sha256",secret).update(`${timestamp}.${nonce}.${body}`).digest("hex");
  if(!safeEqual(signature,expected))return NextResponse.json({ok:false,error:"Assinatura inválida."},{status:401});
  let payload:{action?:string;slug?:string;previous_slug?:string|null};try{payload=JSON.parse(body);}catch{return NextResponse.json({ok:false,error:"Payload inválido."},{status:400});}
  if(!payload.slug||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug))return NextResponse.json({ok:false,error:"Slug inválido."},{status:400});
  seenNonces.set(nonce,now+10*60_000);
  revalidateTag("blog-posts","max");revalidateTag("blog-categories","max");revalidateTag(`blog-post:${payload.slug}`,"max");revalidatePath("/blog");revalidatePath(`/blog/${payload.slug}`);
  if(payload.previous_slug&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.previous_slug)){revalidateTag(`blog-post:${payload.previous_slug}`,"max");revalidatePath(`/blog/${payload.previous_slug}`);}
  revalidatePath("/sitemap.xml");revalidatePath("/rss.xml");
  return NextResponse.json({ok:true,revalidated:true,slug:payload.slug});
}
