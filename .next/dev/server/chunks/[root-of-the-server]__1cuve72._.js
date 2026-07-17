module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/lib/blog-api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogCategories",
    ()=>getBlogCategories,
    "getBlogPost",
    ()=>getBlogPost,
    "getBlogPosts",
    ()=>getBlogPosts,
    "getPreviewPost",
    ()=>getPreviewPost
]);
const API_BASE = (process.env.BLOG_API_BASE_URL || "http://localhost:3000/api/public/blog").replace(/\/+$/, "");
async function apiFetch(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, options);
    if (!response.ok) throw new Error(`BLOG_API_${response.status}`);
    return response.json();
}
async function getBlogPosts(params = {}) {
    const search = new URLSearchParams();
    if (params.page) search.set("page", String(params.page));
    if (params.limit) search.set("limit", String(params.limit));
    if (params.category) search.set("category", params.category);
    if (params.featured !== undefined) search.set("featured", String(params.featured));
    return apiFetch(`/posts?${search}`, {
        next: {
            tags: [
                "blog-posts"
            ],
            revalidate: 300
        }
    });
}
async function getBlogPost(slug) {
    return apiFetch(`/posts/${encodeURIComponent(slug)}`, {
        next: {
            tags: [
                "blog-posts",
                `blog-post:${slug}`
            ],
            revalidate: 300
        },
        redirect: "manual"
    });
}
async function getBlogCategories() {
    return apiFetch("/categories", {
        next: {
            tags: [
                "blog-categories"
            ],
            revalidate: 900
        }
    });
}
async function getPreviewPost(token) {
    return apiFetch(`/preview/${encodeURIComponent(token)}`, {
        cache: "no-store"
    });
}
}),
"[project]/app/rss.xml/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blog$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/blog-api.ts [app-route] (ecmascript)");
;
function escapeXml(value) {
    return value.replace(/[<>&'\"]/g, (char)=>({
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "'": "&apos;",
            '"': "&quot;"
        })[char] || char);
}
async function GET() {
    const site = process.env.NEXT_PUBLIC_SITE_URL || "https://www.summflux.com";
    const { data: posts } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$blog$2d$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBlogPosts"])({
        limit: 24
    });
    const items = posts.map((post)=>`<item><title>${escapeXml(post.title)}</title><link>${site}/blog/${post.slug}</link><guid>${site}/blog/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.published_at).toUTCString()}</pubDate></item>`).join("");
    const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Blog SummFlux</title><link>${site}/blog</link><description>Inteligência comercial, vendas, WhatsApp e CRM.</description>${items}</channel></rss>`;
    return new Response(xml, {
        headers: {
            "content-type": "application/rss+xml; charset=utf-8",
            "cache-control": "public, s-maxage=300, stale-while-revalidate=600"
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1cuve72._.js.map