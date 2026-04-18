"use client";

import { motion, useReducedMotion } from "framer-motion";

import { editorialEase } from "@/lib/motion";
import {
  BookOpen,
  Heart,
  Shield,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const items = [
  {
    title: "안전한 공간",
    body: "출입·동선·응급 연락망을 정비한 공간에서 하루를 보냅니다.",
    icon: Shield,
  },
  {
    title: "따뜻한 식사",
    body: "균형 잡힌 한 끼와 간식으로 에너지를 채웁니다.",
    icon: UtensilsCrossed,
  },
  {
    title: "교육 지원",
    body: "숙제와 독서, 작은 목표까지 곁에서 돕니다.",
    icon: BookOpen,
  },
  {
    title: "놀이와 활동",
    body: "실내·실외 활동으로 몸과 마음을 함께 움직입니다.",
    icon: Sparkles,
  },
  {
    title: "정서적 돌봄",
    body: "경청과 격려로 오늘의 감정을 나눌 수 있습니다.",
    icon: Heart,
  },
] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: editorialEase },
  },
};

function Card({
  title,
  body,
  icon: Icon,
  reduce,
}: {
  title: string;
  body: string;
  icon: (typeof items)[number]["icon"];
  reduce: boolean;
}) {
  return (
    <motion.div
      className="flex h-full flex-col rounded-xl border border-border/70 bg-card/90 p-5 shadow-sm ring-1 ring-foreground/5"
      whileHover={reduce ? undefined : { y: -5, transition: { duration: 0.28, ease: editorialEase } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" aria-hidden />
      </div>
      <h3 className="mt-4 font-heading text-base font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </motion.div>
  );
}

export function ProvideSection() {
  /** Framer는 `boolean | null`을 반환해 빌드 시 `boolean` prop과 충돌하지 않도록 명시 */
  const reduce = useReducedMotion() === true;

  if (reduce) {
    return (
      <section className="border-y border-border/60 bg-muted/25 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What we provide
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              무엇을 제공하나요?
            </h2>
            <p className="mt-4 text-muted-foreground">
              다섯 가지 축으로 하루를 설계합니다.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {items.map((entry) => (
              <li key={entry.title}>
                <Card {...entry} reduce />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-border/60 bg-muted/25 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            What we provide
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            무엇을 제공하나요?
          </h2>
          <p className="mt-4 text-muted-foreground">
            다섯 가지 축으로 하루를 설계합니다. 모션은 스크롤에 맞춰 가볍게
            등장합니다.
          </p>
        </div>

        <motion.ul
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px", amount: 0.2 }}
        >
          {items.map((entry) => (
            <motion.li
              key={entry.title}
              variants={item}
              className="h-full [list-style:none]"
            >
              <Card {...entry} reduce={reduce} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
