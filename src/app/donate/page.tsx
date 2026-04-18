import type { Metadata } from "next";
import Link from "next/link";
import {
  Apple,
  BookOpen,
  Building2,
  HeartHandshake,
  PartyPopper,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { getDonatePageContent } from "@/lib/data/site-content";
import { cn } from "@/lib/utils";

export const revalidate = 120;

export const metadata: Metadata = {
  title: "후원",
  description:
    "어린이 둥지 후원이 어떻게 쓰이는지, 후원 방법과 FAQ, 연락처를 안내합니다.",
};

const whyPoints = [
  {
    title: "식사 · 간식",
    body: "성장기에 필요한 영양과 규칙적인 식사 리듬을 지켜 줍니다.",
    icon: Apple,
  },
  {
    title: "교육 · 학습",
    body: "숙제·독서·멘토링으로 학교 생활을 보조합니다.",
    icon: BookOpen,
  },
  {
    title: "돌봄 · 안전",
    body: "등하원 동선과 응급 연락 체계로 하루를 안전하게 묶습니다.",
    icon: HeartHandshake,
  },
  {
    title: "활동 · 놀이",
    body: "미술·음악·운동 등 다양한 경험으로 자존감을 쌓습니다.",
    icon: PartyPopper,
  },
  {
    title: "공간 유지",
    body: "청결·소모품·시설 보수로 매일 문을 열 수 있습니다.",
    icon: Building2,
  },
] as const;

const useOfFunds = [
  { label: "식재료 · 식사", pct: "32%", note: "따뜻한 한 끼와 간식" },
  { label: "교육 · 활동", pct: "28%", note: "재료·강사·프로그램" },
  { label: "인건비 · 돌봄", pct: "24%", note: "코디네이터·봉사 보조" },
  { label: "공간 · 행정", pct: "16%", note: "임차·유지·안전" },
] as const;

const defaultFaqs = [
  {
    q: "후원금은 세금 공제가 되나요?",
    a: "국가·제휴 단체에 따라 다릅니다. 영수증이 필요하시면 문의 주세요. 관리자에서 안내 문구를 수정할 수 있습니다.",
  },
  {
    q: "정기 후원은 어떻게 하나요?",
    a: "계좌 이체로 매월 같은 날짜에 보내 주시거나, 외부 플랫폼 링크를 통해 설정할 수 있습니다. (아래 Ways to Give 참고)",
  },
  {
    q: "물품 후원도 가능한가요?",
    a: "학용품·도서·비식품 등은 사전에 필요 품목을 안내드린 뒤 맞춰 받습니다. 식품은 유통기한·보관 조건을 확인합니다.",
  },
  {
    q: "현장 봉사는 어떻게 신청하나요?",
    a: "연락처로 간단한 소개와 가능한 일정을 보내 주시면 코디네이터가 연락드립니다.",
  },
] as const;

export default async function DonatePage() {
  const content = await getDonatePageContent();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Donate
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          후원 안내
        </h1>
        <p className="mt-3 text-muted-foreground">
          아이들의 오후를 지키는 데 쓰이는 후원의 흐름과 방법을 투명하게
          안내합니다. 계좌·링크·문의는 관리자 대시보드의「후원 문구」메뉴에서
          수정할 수 있습니다.
        </p>
      </header>

      <section
        className="mt-16 scroll-mt-24"
        id="why"
        aria-labelledby="why-heading"
      >
        <h2
          id="why-heading"
          className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
        >
          왜 후원이 필요한가요?
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          취약 환경의 아이들에게 방과 후 시간은 곧 안전과 자존감입니다. 후원은
          아래 영역으로 균형 있게 배분됩니다.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map(({ title, body, icon: Icon }) => (
            <li
              key={title}
              className="rounded-2xl border border-border/70 bg-card/90 p-6 shadow-sm ring-1 ring-foreground/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-20 scroll-mt-24"
        id="use"
        aria-labelledby="use-heading"
      >
        <h2
          id="use-heading"
          className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
        >
          후원금은 어디에 쓰이나요?
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
          비율은 운영 계획에 따라 조정될 수 있는 예시입니다. 아이콘 카드로
          한눈에 보실 수 있습니다.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useOfFunds.map((row) => (
            <li
              key={row.label}
              className="flex flex-col rounded-2xl border border-border/70 bg-gradient-to-b from-card to-muted/20 p-6 text-center ring-1 ring-foreground/5"
            >
              <span className="font-heading text-3xl font-semibold text-primary">
                {row.pct}
              </span>
              <span className="mt-2 font-medium text-foreground">{row.label}</span>
              <span className="mt-1 text-xs text-muted-foreground">{row.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-20 scroll-mt-24"
        id="ways"
        aria-labelledby="ways-heading"
      >
        <h2
          id="ways-heading"
          className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
        >
          후원 방법
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">{content.waysIntro}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              계좌 이체
            </h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
              {content.bankInfo}
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              외부 링크
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              해외·정기 후원에 익숙한 분들을 위한 옵션입니다.
            </p>
            {content.externalUrl ? (
              <a
                href={content.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "mt-6 inline-flex w-full justify-center sm:w-auto"
                )}
              >
                {content.externalLabel}
              </a>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                등록된 외부 링크가 없습니다. 관리자에서 추가할 수 있습니다.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        className="mt-20 scroll-mt-24"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="font-heading text-2xl font-semibold text-foreground sm:text-3xl"
        >
          자주 묻는 질문
        </h2>
        <Accordion defaultValue={[]} className="mt-8 max-w-3xl">
          {defaultFaqs.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section
        className="mt-20 scroll-mt-24 rounded-2xl border border-border/70 bg-muted/25 p-8 sm:p-10"
        id="contact"
        aria-labelledby="contact-heading"
      >
        <h2
          id="contact-heading"
          className="font-heading text-2xl font-semibold text-foreground"
        >
          연락처
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {content.contactNote}
        </p>
        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="font-medium text-foreground">이메일</dt>
            <dd>
              <a
                className="text-primary underline-offset-4 hover:underline"
                href={`mailto:${content.contactEmail}`}
              >
                {content.contactEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">전화 · 메신저</dt>
            <dd className="text-muted-foreground">{content.contactPhone}</dd>
          </div>
        </dl>
        <Link
          href="/news"
          className={cn(
            buttonVariants({ variant: "ghost", size: "lg" }),
            "mt-8 inline-flex"
          )}
        >
          소식으로 돌아가기
        </Link>
      </section>
    </div>
  );
}
