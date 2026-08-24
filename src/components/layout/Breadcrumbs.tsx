"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        홈
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        return (
          <Fragment key={href}>
            <span>/</span>
            {isLast ? (
              <span className="text-foreground">{segment}</span>
            ) : (
              <Link href={href} className="hover:text-foreground">
                {segment}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
