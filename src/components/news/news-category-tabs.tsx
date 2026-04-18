import Link from "next/link";

import { NEWS_CATEGORY_TABS } from "@/lib/constants/news-categories";
import { cn } from "@/lib/utils";

type Props = {
  activeTabId: string;
};

export function NewsCategoryTabs({ activeTabId }: Props) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="뉴스 카테고리"
    >
      {NEWS_CATEGORY_TABS.map((tab) => {
        const href = tab.id === "all" ? "/news" : `/news?tab=${tab.id}`;
        const active = activeTabId === tab.id;

        return (
          <Link
            key={tab.id}
            href={href}
            scroll={false}
            role="tab"
            aria-selected={active}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted/80 text-foreground/80 hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
