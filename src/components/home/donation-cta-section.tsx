"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { DonationCtaCopy } from "@/lib/data/home-page-content";
import { cn } from "@/lib/utils";

export function DonationCtaSection({ copy }: { copy: DonationCtaCopy }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-muted/25 via-background to-muted/15 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-brand opacity-[0.42]"
        aria-hidden
      />
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.donateCtaTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg whitespace-pre-line">
            {copy.donateCtaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/donate"
              className={cn(
                buttonVariants({ size: "lg" }),
                "shadow-glow-sm transition-shadow hover:shadow-glow"
              )}
            >
              {copy.donateCtaPrimaryLabel}
            </Link>
            <Link
              href="/news"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-primary/30 bg-background/80"
              )}
            >
              {copy.donateCtaSecondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
