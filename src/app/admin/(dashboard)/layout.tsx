import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const adminNav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/posts", label: "게시글" },
  { href: "/admin/pages", label: "페이지 문구" },
  { href: "/admin/content", label: "후원 정보" },
  { href: "/admin/media", label: "미디어" },
] as const;

export default function AdminDashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[60vh] border-b border-border/60 bg-muted/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6">
        <aside className="shrink-0 sm:w-48">
          <p className="font-heading text-sm font-semibold text-foreground">
            어린이 둥지
          </p>
          <p className="text-xs text-muted-foreground">Admin</p>
          <nav className="mt-4 flex flex-col gap-1" aria-label="관리자 메뉴">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2 py-1.5 text-sm font-medium text-foreground/85 transition-colors",
                  "hover:bg-background hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6">
            <AdminLogoutButton />
          </div>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
