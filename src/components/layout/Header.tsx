"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/store/sidebarStore";
import { Breadcrumbs } from "./Breadcrumbs";
import { UserNav } from "./UserNav";

export function Header() {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggle}>
          <Menu className="size-4" />
        </Button>
        <Breadcrumbs />
      </div>
      <UserNav />
    </header>
  );
}
