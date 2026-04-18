"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { HeroSectionCopy } from "@/lib/data/home-page-content";
import { cn } from "@/lib/utils";

const heroBackgroundUrl =
  "https://images.unsplash.com/photo-1587654780293-953cf1bc64b5?w=1920&q=80";

export function HeroSection({ copy }: { copy: HeroSectionCopy }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "28%"]
  );
  const scaleBg = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 1.06]
  );
  const yContent = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "12%"]
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <motion.div
        style={{
          y: yBg,
          scale: scaleBg,
          backgroundImage: `url(${heroBackgroundUrl})`,
        }}
        className="absolute inset-0 -z-10 bg-cover bg-center will-change-transform"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/35 to-background" />
        <div
          className="absolute inset-0 bg-gradient-brand opacity-40 mix-blend-soft-light"
          aria-hidden
        />
      </motion.div>

      <motion.div
        style={{ y: yContent }}
        className="mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32"
      >
        <div className="glass-panel max-w-2xl rounded-3xl p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
            {copy.heroKicker}
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-heading text-3xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            {copy.heroHeadingMain}
            <span className="text-primary">{copy.heroHeadingAccent}</span>
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy.heroBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={copy.heroCtaSecondaryHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary/30 bg-background/70"
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
        </div>
      </motion.div>
    </section>
  );
}
