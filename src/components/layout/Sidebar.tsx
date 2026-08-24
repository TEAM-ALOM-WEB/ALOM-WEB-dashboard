"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  Megaphone,
  Users,
  UserSearch,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebarStore";

const navItems = [
  { href: "/", label: "개요", icon: LayoutDashboard },
  { href: "/members", label: "아롬인", icon: Users },
  { href: "/projects", label: "프로젝트", icon: FolderKanban },
  { href: "/recruitment", label: "리크루팅", icon: UserSearch },
  { href: "/studies", label: "스터디", icon: Megaphone },
  { href: "/contents", label: "콘텐츠/공지", icon: Megaphone },
];

export function Sidebar() {
  const pathname = usePathname();
  const collapsed = useSidebarStore((state) => state.collapsed);

  return (
    <aside
      className={cn(
        "hidden shrink-0 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col",
        collapsed ? "md:w-16" : "md:w-56"
      )}
    >
      <div className="flex h-14 items-center border-b px-4 font-semibold">
        {collapsed ? "AL" : "ALOM Admin"}
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                active && "bg-sidebar-accent text-sidebar-accent-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
