import Link from "next/link";

import { cn } from "@/lib/utils";

const footerLinks = [
  { href: "/", label: "소개" },
  { href: "/news", label: "뉴스" },
  { href: "/donate", label: "후원" },
] as const;

export function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "border-t border-border/50 bg-gradient-to-b from-muted/20 via-muted/12 to-background text-sm text-muted-foreground",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-3">
            <p className="font-heading text-base font-semibold tracking-tight text-foreground">
              어린이 둥지 · Children&apos;s Nest
            </p>
            <p className="leading-relaxed text-muted-foreground/95">
              브라질 취약 환경의 아이들을 위한 방과 후 돌봄 사역입니다. 안전한
              공간과 따뜻한 식사, 교육과 놀이로 한 오후를 지켜 줍니다.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="푸터 링크">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin/login"
              className="font-medium text-foreground/50 underline-offset-4 transition-colors hover:text-foreground/80 hover:underline"
            >
              관리자 로그인
            </Link>
          </nav>
        </div>
        <p className="text-xs text-muted-foreground/90">
          © {new Date().getFullYear()} Children&apos;s Nest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
