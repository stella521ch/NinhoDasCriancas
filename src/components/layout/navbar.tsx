"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "소개" },
  { href: "/news", label: "뉴스" },
  { href: "/donate", label: "후원" },
] as const;

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "rounded-full px-3 py-1.5 text-lg font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-foreground/75 hover:bg-muted/60 hover:text-foreground"
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 shadow-soft backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-[110px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex flex-col leading-tight">
          <span className="font-heading text-[1.375rem] font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary/90">
            어린이 둥지
          </span>
          <span className="text-[0.9rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Children&apos;s Nest
          </span>
        </Link>

        <nav
          className="hidden items-center gap-2 md:flex"
          aria-label="주요 메뉴"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
          <Link
            href="/donate"
            className={cn(
              buttonVariants({ size: "default" }),
              "ml-4 text-base shadow-glow-sm transition-[box-shadow,transform] hover:shadow-glow"
            )}
          >
            후원하기
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/donate"
            className={cn(
              buttonVariants({ size: "default" }),
              "text-base shadow-glow-sm"
            )}
          >
            후원
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border/50 bg-background/95 px-4 py-5 backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-4" aria-label="모바일 메뉴">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
