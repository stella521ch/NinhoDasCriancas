"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { editorialEase } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

function CountValue({
  from,
  to,
  duration = 1.6,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-24px" });
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [from, to, inView, duration]);

  return <span ref={ref}>{val}</span>;
}

const stats = [
  {
    key: "y2018",
    label: "사역 시작",
    node: (
      <span className="font-heading text-4xl font-semibold sm:text-5xl">
        <CountValue from={2008} to={2018} duration={1.4} />
        <span className="text-2xl sm:text-3xl">년</span>
      </span>
    ),
  },
  {
    key: "y2025",
    label: "어린이 둥지 설립",
    node: (
      <span className="font-heading text-4xl font-semibold sm:text-5xl">
        <CountValue from={2018} to={2025} duration={1.1} />
        <span className="text-2xl sm:text-3xl">년</span>
      </span>
    ),
  },
  {
    key: "kids",
    label: "돌봄 아동",
    node: (
      <span className="font-heading text-4xl font-semibold sm:text-5xl">
        <CountValue from={0} to={30} duration={1.8} />
        <span className="text-primary">+</span>
      </span>
    ),
  },
  {
    key: "days",
    label: "주당 운영",
    node: (
      <span className="font-heading text-4xl font-semibold sm:text-5xl">
        주 <CountValue from={0} to={5} duration={1.2} />
        <span className="text-2xl sm:text-3xl">일</span>
      </span>
    ),
  },
] as const;

export function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-border/50 bg-gradient-to-b from-muted/25 via-muted/10 to-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          By the numbers
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          숫자로 보는 둥지
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          후원과 기도로 쌓인 시간입니다. 실제 수치는 운영 상황에 따라
          갱신됩니다.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.08,
                duration: 0.52,
                ease: editorialEase,
              }}
              whileHover={reduce ? undefined : { y: -3 }}
              className="rounded-2xl border border-border/60 bg-card/90 p-6 shadow-soft ring-1 ring-foreground/[0.05]"
            >
              <div className="text-foreground">{s.node}</div>
              <p className="mt-3 text-sm font-medium text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
