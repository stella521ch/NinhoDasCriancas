"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionReveal } from "@/components/home/section-reveal";

const steps = [
  { title: "하교 후 도착", body: "등원·건강 체크로 하루를 안전하게 시작합니다." },
  { title: "간식 · 식사", body: "에너지를 보충하고 함께 먹는 시간을 가집니다." },
  { title: "학습 및 교육", body: "숙제·독서·팀 활동으로 학교를 돕습니다." },
  { title: "다양한 활동", body: "미술·음악·운동 등 창의와 웃음을 나눕니다." },
  { title: "귀가", body: "보호자 연락과 귀가 동선을 확인하며 마무리합니다." },
] as const;

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function DailyFlowSection() {
  const reduce = useReducedMotion();

  return (
    <SectionReveal className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
        Daily flow
      </p>
      <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        하루의 흐름
      </h2>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        방과 후 한 오후가 어떻게 이어지는지 타임라인으로 정리했습니다.
      </p>

      <motion.ol
        className="relative mt-12 space-y-0 border-l border-primary/25 pl-8 sm:pl-10"
        variants={reduce ? undefined : listVariants}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, margin: "-50px" }}
      >
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            className="relative pb-12 last:pb-0"
            variants={reduce ? undefined : itemVariants}
          >
            <span
              className="absolute -left-[21px] top-1 flex size-3 rounded-full border-2 border-background bg-primary sm:-left-[25px] sm:size-3.5"
              aria-hidden
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary/90">
              Step {i + 1}
            </span>
            <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </SectionReveal>
  );
}
