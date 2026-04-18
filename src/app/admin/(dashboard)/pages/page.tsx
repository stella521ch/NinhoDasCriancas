import { HomeMarketingForm } from "@/components/admin/home-marketing-form";
import { getHomeMarketingContent } from "@/lib/data/home-page-content";

export const dynamic = "force-dynamic";

export default async function AdminHomeMarketingPage() {
  const content = await getHomeMarketingContent();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          페이지 문구 (홈)
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          메인(`/`) 히어로·미션·후원 CTA·소식 블록 제목 등을 수정합니다. 후원
          상세 문구는「후원 문구」메뉴에서 다룹니다.
        </p>
      </div>
      <HomeMarketingForm content={content} />
    </div>
  );
}
