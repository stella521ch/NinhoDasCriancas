"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { HeroSectionCopy } from "@/lib/data/home-page-content";
import { cn } from "@/lib/utils";

/** 헤더 바로 아래 히어로 슬라이드 높이 (px) */
const HERO_HEIGHT_PX = 780;

const SLIDE_IMAGE_URLS = [
  "https://images.unsplash.com/photo-1587654780293-953cf1bc64b5?w=1600&q=80",
  "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1600&q=80",
  "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&q=80",
  "https://images.unsplash.com/photo-1491013516836-7db643ee448a?w=1600&q=80",
] as const;

const AUTOPLAY_MS = 6000;

export function HeroSection({ copy }: { copy: HeroSectionCopy }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => {
      const n = SLIDE_IMAGE_URLS.length;
      return (i + dir + n) % n;
    });
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [go, reduceMotion]);

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-neutral-900"
      style={{ height: HERO_HEIGHT_PX }}
      aria-roledescription="carousel"
      aria-label="메인 비주얼"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0" aria-hidden>
        {SLIDE_IMAGE_URLS.map((url, i) => (
          <div
            key={url}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-out",
              i === index ? "z-[1] opacity-100" : "z-0 opacity-0"
            )}
            style={{ backgroundImage: `url(${url})` }}
          />
        ))}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-black/20 to-black/75" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[3] flex items-end"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 pb-8 pt-16 text-white sm:px-6 sm:pb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
            {copy.heroKicker}
          </p>
          <h1
            id="hero-heading"
            className="max-w-3xl font-heading text-2xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
          >
            {copy.heroHeadingMain}
            <span className="text-primary drop-shadow-sm">{copy.heroHeadingAccent}</span>
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">
            {copy.heroBody}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href={copy.heroCtaSecondaryHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              )}
            >
              {copy.heroCtaSecondaryLabel}
            </Link>
            <Link
              href={copy.heroCtaPrimaryHref}
              className={cn(
                buttonVariants({ size: "lg" }),
                "shadow-glow-sm transition-shadow hover:shadow-glow"
              )}
            >
              {copy.heroCtaPrimaryLabel}
            </Link>
          </div>

          <div className="mt-4 flex justify-center gap-2 sm:mt-6" role="tablist" aria-label="슬라이드 선택">
            {SLIDE_IMAGE_URLS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`슬라이드 ${i + 1} / ${SLIDE_IMAGE_URLS.length}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  i === index ? "w-8 bg-white" : "w-2 bg-white/45 hover:bg-white/70"
                )}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:left-4 sm:size-11"
        aria-label="이전 이미지"
        onClick={() => go(-1)}
      >
        <ChevronLeft className="size-6" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        className="absolute right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 sm:right-4 sm:size-11"
        aria-label="다음 이미지"
        onClick={() => go(1)}
      >
        <ChevronRight className="size-6" strokeWidth={1.75} />
      </button>
    </section>
  );
}
