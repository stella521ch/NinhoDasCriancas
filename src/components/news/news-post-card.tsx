import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/types/post";

function formatDate(iso: string | null) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("ko", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

export function NewsPostCard({ post }: { post: Post }) {
  return (
    <article>
      <Link
        href={`/news/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm ring-1 ring-foreground/5 transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          {post.thumbnail_url ? (
            <Image
              src={post.thumbnail_url}
              alt={`${post.title} 대표 이미지`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div
              className="absolute inset-0 bg-muted"
              aria-hidden
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          {post.category ? (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-0.5 text-xs font-medium text-foreground ring-1 ring-border/80">
              {post.category}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            className="text-xs text-muted-foreground"
            dateTime={post.published_at ?? undefined}
          >
            {formatDate(post.published_at)}
          </time>
          <h2 className="mt-2 font-heading text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
            {post.title}
          </h2>
          {post.summary ? (
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {post.summary}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
