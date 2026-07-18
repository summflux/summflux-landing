import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BlogCard } from "../../components/BlogCard";
import { PublicFooter } from "../../components/PublicFooter";
import { PublicHeader } from "../../components/PublicHeader";
import { getBlogCategories, getBlogPosts } from "../../lib/blog-api";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Estratégias e análises práticas sobre vendas, WhatsApp, CRM, inteligência comercial e gestão baseada em evidências.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const category = String(params.category || "");
  const [{ data: posts, total, limit }, { data: categories }] = await Promise.all([
    getBlogPosts({ page, limit: 12, category }),
    getBlogCategories(),
  ]);
  const featured = posts.find((post) => post.featured) || posts[0];
  const remaining = featured ? posts.filter((post) => post.id !== featured.id) : posts;
  const pages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="blog-body">
      <PublicHeader />
      <main>
        <section className="blog-hero">
          <div className="blog-container blog-hero-grid">
            <div>
              <span className="blog-kicker">Conteúdo para operações comerciais</span>
              <h1>Decisões melhores começam com contexto melhor.</h1>
              <p>
                Estratégias, análises e aprendizados sobre vendas por conversa, CRM,
                inteligência comercial e gestão baseada em evidências.
              </p>
            </div>
            {featured && (
              <Link className="blog-feature-card" href={`/blog/${featured.slug}`}>
                {featured.cover_image_url ? (
                  <Image
                    src={featured.cover_image_url}
                    alt={featured.cover_image_alt}
                    width={800}
                    height={450}
                    priority
                    unoptimized
                  />
                ) : (
                  <div style={{ aspectRatio: "16/9", background: "#f1f5f9" }} />
                )}
                <div>
                  <span className="blog-category">{featured.category_name || "Destaque"}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                </div>
              </Link>
            )}
          </div>
        </section>

        <section className="blog-list-section">
          <div className="blog-container">
            <div className="blog-section-head">
              <div>
                <h2>Artigos recentes</h2>
                <p>Conteúdo direto, sem frases vazias ou teoria desconectada da operação.</p>
              </div>
              <div className="blog-categories">
                <Link className={!category ? "active" : ""} href="/blog">
                  Todos
                </Link>
                {categories
                  .filter((item) => item.posts_count > 0)
                  .map((item) => (
                    <Link
                      className={category === item.slug ? "active" : ""}
                      key={item.id}
                      href={`/blog?category=${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>

            {remaining.length ? (
              <div className="blog-grid">
                {remaining.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="blog-empty-public">
                <h2>Ainda não há artigos nesta categoria.</h2>
                <p>Escolha outra categoria ou volte em breve.</p>
              </div>
            )}

            {pages > 1 && (
              <nav className="blog-pagination" aria-label="Paginação">
                {page > 1 && (
                  <Link href={`/blog?page=${page - 1}${category ? `&category=${category}` : ""}`}>
                    Anterior
                  </Link>
                )}
                <span>
                  Página {page} de {pages}
                </span>
                {page < pages && (
                  <Link href={`/blog?page=${page + 1}${category ? `&category=${category}` : ""}`}>
                    Próxima
                  </Link>
                )}
              </nav>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
