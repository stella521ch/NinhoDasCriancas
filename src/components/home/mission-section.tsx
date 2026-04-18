import Image from "next/image";

import { SectionReveal } from "@/components/home/section-reveal";
import type { MissionSectionCopy } from "@/lib/data/home-page-content";

export function MissionSection({ copy }: { copy: MissionSectionCopy }) {
  return (
    <SectionReveal id="mission" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="order-2 space-y-6 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {copy.missionKicker}
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.missionTitle}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
            {copy.missionP1}
          </p>
          <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
            {copy.missionP2}
          </p>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-foreground/10">
            <Image
              src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=900&q=80"
              alt="아이들과 함께하는 활동 모습을 상징하는 플레이스홀더 이미지"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
