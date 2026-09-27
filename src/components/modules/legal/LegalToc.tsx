"use client";

import { cn } from "cn";
import { useEffect, useState } from "react";

type TocItem = { id: string; title: string };

export default function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);

    return () => observer.disconnect();
  }, [items]);

  return (
    <>
      <details className="group rounded-xl border bg-muted/40 lg:hidden">
        <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-medium">
          On this page
          <span
            aria-hidden
            className="text-muted-foreground transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>
        <nav className="flex flex-col gap-1 border-t px-2 py-3">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                active === item.id
                  ? "font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </details>

      <nav
        aria-label="On this page"
        className="sticky top-24 hidden self-start lg:block"
      >
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          On this page
        </p>
        <ul className="mt-4 flex flex-col gap-1 border-l">
          {items.map((item) => {
            const isActive = active === item.id;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "-ml-px block border-l py-1.5 pl-4 text-sm transition-colors hover:text-foreground",
                    isActive
                      ? "border-primary font-medium text-primary"
                      : "border-transparent text-muted-foreground",
                  )}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
