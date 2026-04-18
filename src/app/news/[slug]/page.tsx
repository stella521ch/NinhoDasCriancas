import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { NewsPostCard } from "@/components/news/news-post-card";
import { buttonVariants } from "@/components/ui/button";
import { listRelatedPosts, getPublishedPostBySlug } from "@/lib/data/posts";
import { cn } from "@/lib/utils";

export const revalidate = 60;

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("ko", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) {
    return { title: "찾을 수 없음" };
  }
  return {
    title: post.title,
    description: post.summary ?? undefined,
    openGraph: post.thumbnail_url
      ? { images: [{ url: post.thumbnail_url, alt: post.title }] }
      : undefined,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPublishedPostBySlug(params.slug);
  if (!post) notFound();

  const related = await listRelatedPosts(
    post.slug,
    post.category ?? null,
    2
  );

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        {post.category ? (
          <p className="text-sm font-medium text-primary">{post.category}</p>
        ) : null}
        <h1 className="mt-2 font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <time
          className="mt-3 block text-sm text-muted-foreground"
          dateTime={post.published_at ?? undefined}
        >
          {formatDate(post.published_at)}
        </time>
      </header>

      {post.thumbnail_url ? (
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-foreground/10">
          <Image
            src={post.thumbnail_url}
            alt={`${post.title} 대표 이미지`}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 720px, 100vw"
          />
        </div>
      ) : null}

      <div className="prose prose-neutral prose-lg mt-10 max-w-none font-sans prose-headings:font-heading prose-a:text-primary prose-img:rounded-xl">
        <ReactMarkdown
          components={{
            img: ({ src, alt }) => {
              if (!src || typeof src !== "string") return null;
              return (
                <span className="not-prose relative my-8 block aspect-video w-full overflow-hidden rounded-xl ring-1 ring-border/60">
                  <Image
                    src={src}
                    alt={typeof alt === "string" ? alt : "본문 이미지"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 720px, 100vw"
                  />
                </span>
              );
            },
          }}
        >
          {post.content ?? ""}
        </ReactMarkdown>
      </div>

      {post.images?.length ? (
        <section className="mt-12" aria-labelledby="more-images">
          <h2
            id="more-images"
            className="font-heading text-lg font-semibold text-foreground"
          >
            추가 이미지
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {post.images.map((url, i) => (
              <li
                key={`${url}-${i}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border/60"
              >
                <Image
                  src={url}
                  alt={`${post.title} 추가 사진 ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section
        className="mt-16 border-t border-border/70 pt-12"
        aria-labelledby="related"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="related"
            className="font-heading text-xl font-semibold text-foreground"
          >
            관련 소식
          </h2>
          <Link
            href="/news"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            뉴스 목록으로
          </Link>
        </div>
        {related.length ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <li key={p.id}>
                <NewsPostCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            표시할 관련 글이 없습니다.
          </p>
        )}
      </section>

      <div className="mt-14 rounded-2xl border border-primary/20 bg-muted/30 p-8 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">
          한 아이의 오후를 함께 지켜 주세요
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          후원은 식사·교육·공간 유지로 바로 이어집니다.
        </p>
        <Link
          href="/donate"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-6 inline-flex shadow-glow-sm transition-shadow hover:shadow-glow"
          )}
        >
          후원하기
        </Link>
      </div>
    </article>
  );
}
