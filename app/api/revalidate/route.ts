import crypto from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const seenNonces = new Map<string, number>();
const rateBuckets = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;
const MAX_TRACKED_CLIENTS = 5_000;
const MAX_TRACKED_NONCES = 5_000;
const MAX_BODY_BYTES = 4_096;
const ALLOWED_ACTIONS = new Set(["publish", "update", "unpublish", "archive", "delete", "scheduled_publish"]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function cleanup(now: number) {
  for (const [nonce, expires] of seenNonces) if (expires <= now) seenNonces.delete(nonce);
  for (const [key, bucket] of rateBuckets) if (bucket.resetAt <= now) rateBuckets.delete(key);
}

function clientKey(request: NextRequest) {
  return (request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown")
    .split(",")[0]
    .trim()
    .slice(0, 80);
}

function consumeRateLimit(request: NextRequest, now: number) {
  const key = clientKey(request);
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    if (rateBuckets.size >= MAX_TRACKED_CLIENTS) return false;
    rateBuckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT) return false;
  current.count += 1;
  return true;
}

function safeEqual(left: string, right: string) {
  if (!/^[a-f0-9]{64}$/i.test(left) || !/^[a-f0-9]{64}$/i.test(right)) return false;
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  return crypto.timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  const secret = process.env.BLOG_REVALIDATION_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: "Revalidação não configurada." }, { status: 503 });

  const now = Date.now();
  cleanup(now);
  if (!consumeRateLimit(request, now)) {
    return NextResponse.json({ ok: false, error: "Muitas tentativas de revalidação." }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, error: "Payload muito grande." }, { status: 413 });

  const timestamp = request.headers.get("x-summflux-timestamp") || "";
  const nonce = request.headers.get("x-summflux-nonce") || "";
  const signature = request.headers.get("x-summflux-signature") || "";
  const body = await request.text();
  if (Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Payload muito grande." }, { status: 413 });
  }

  if (
    !/^\d{13}$/.test(timestamp) ||
    Math.abs(now - Number(timestamp)) > 5 * 60_000 ||
    !/^[a-f0-9-]{20,80}$/i.test(nonce) ||
    seenNonces.has(nonce)
  ) {
    return NextResponse.json({ ok: false, error: "Assinatura expirada ou repetida." }, { status: 401 });
  }

  const expected = crypto.createHmac("sha256", secret).update(`${timestamp}.${nonce}.${body}`).digest("hex");
  if (!safeEqual(signature, expected)) {
    return NextResponse.json({ ok: false, error: "Assinatura inválida." }, { status: 401 });
  }

  let payload: { action?: string; slug?: string; previous_slug?: string | null };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ ok: false, error: "Payload inválido." }, { status: 400 });
  }

  if (!payload.action || !ALLOWED_ACTIONS.has(payload.action)) {
    return NextResponse.json({ ok: false, error: "Ação inválida." }, { status: 400 });
  }
  if (!payload.slug || !SLUG_PATTERN.test(payload.slug)) {
    return NextResponse.json({ ok: false, error: "Slug inválido." }, { status: 400 });
  }
  if (payload.previous_slug && !SLUG_PATTERN.test(payload.previous_slug)) {
    return NextResponse.json({ ok: false, error: "Slug anterior inválido." }, { status: 400 });
  }

  if (seenNonces.size >= MAX_TRACKED_NONCES) {
    return NextResponse.json({ ok: false, error: "Capacidade temporariamente esgotada." }, { status: 503 });
  }
  seenNonces.set(nonce, now + 10 * 60_000);

  try {
    revalidateTag("blog-posts", "max");
    revalidateTag("blog-sitemap", "max");
    revalidateTag("blog-redirects", "max");
    revalidateTag("blog-categories", "max");
    revalidateTag(`blog-post:${payload.slug}`, "max");
    revalidatePath("/blog");
    revalidatePath(`/blog/${payload.slug}`);

    if (payload.previous_slug) {
      revalidateTag(`blog-post:${payload.previous_slug}`, "max");
      revalidatePath(`/blog/${payload.previous_slug}`);
    }

    revalidatePath("/sitemap.xml");
    revalidatePath("/rss.xml");

    return NextResponse.json(
      { ok: true, revalidated: true, action: payload.action, slug: payload.slug },
      { headers: { "cache-control": "private, no-store" } }
    );
  } catch (error) {
    const diagnosticCode = `REVALIDATE-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    process.stderr.write(`${JSON.stringify({
      timestamp: new Date().toISOString(),
      level: "error",
      event: "blog.revalidation_failed",
      diagnostic_code: diagnosticCode,
      action: payload.action,
      slug: payload.slug,
      error_code: error instanceof Error ? error.name : "UNKNOWN"
    })}\n`);
    return NextResponse.json(
      { ok: false, error: `Não foi possível revalidar. Código de diagnóstico: ${diagnosticCode}.` },
      { status: 500, headers: { "cache-control": "private, no-store" } }
    );
  }
}
