import {
  DailyFlowSection,
  DonationCtaSection,
  HeroSection,
  MissionSection,
  ProvideSection,
  StatsSection,
  StoriesPreviewSection,
} from "@/components/home";
import {
  getHomeMarketingContent,
  pickDonationCtaCopy,
  pickHeroCopy,
  pickMissionCopy,
  pickStoriesHeadingCopy,
} from "@/lib/data/home-page-content";
import { getLatestPublishedPosts } from "@/lib/data/posts";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "소개",
  description:
    "어린이 둥지(Children's Nest) 미션, 하루의 흐름, 제공 프로그램, 최신 소식을 한눈에 만나 보세요.",
};

export default async function HomePage() {
  const posts = await getLatestPublishedPosts(3);
  const marketing = await getHomeMarketingContent();

  return (
    <>
      <HeroSection copy={pickHeroCopy(marketing)} />
      <MissionSection copy={pickMissionCopy(marketing)} />
      <ProvideSection />
      <DailyFlowSection />
      <StatsSection />
      <StoriesPreviewSection
        posts={posts}
        heading={pickStoriesHeadingCopy(marketing)}
      />
      <DonationCtaSection copy={pickDonationCtaCopy(marketing)} />
    </>
  );
}
