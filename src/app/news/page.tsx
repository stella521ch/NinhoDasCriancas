import type { Metadata } from "next";

import { NewsCategoryTabs } from "@/components/news/news-category-tabs";
import { NewsPostCard } from "@/components/news/news-post-card";
import {
  NEWS_CATEGORY_TABS,
  tabIdToDbCategory,
} from "@/lib/constants/news-categories";
import { listPublishedPosts } from "@/lib/data/posts";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "뉴스",
  description:
    "어린이 둥지의 일상, 행사, 후원 소식, 기도 제목, 변화 이야기를 카테고리별로 확인하세요.",
};

type SearchParams = { tab?: string };

export default async function NewsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const tabRaw = searchParams.tab?.trim();
  const tabId = tabRaw && tabRaw.length > 0 ? tabRaw : "all";
  const activeTabId = NEWS_CATEGORY_TABS.some((t) => t.id === tabId)
    ? tabId
    : "all";

  const category = tabIdToDbCategory(activeTabId);
  const posts = await listPublishedPosts({ category });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          News
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          뉴스
        </h1>
        <p className="mt-3 text-muted-foreground">
          게시 상태가 &apos;published&apos;인 글만 표시합니다. Supabase에
          데이터가 없으면 샘플 글이 보입니다.
        </p>
      </header>

      <div className="mt-10">
        <NewsCategoryTabs activeTabId={activeTabId} />
      </div>

      {posts.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">
          이 카테고리에 표시할 글이 없습니다.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id}>
              <NewsPostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
