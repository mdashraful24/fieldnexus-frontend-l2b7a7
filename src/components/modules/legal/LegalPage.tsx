import type { ReactNode } from "react";
import { Children } from "react";
import Container from "@/components/layout/public/Container";
import LegalToc from "@/components/modules/legal/LegalToc";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {Children.map(items, (item) => (
        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <span
            aria-hidden
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NumberList({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mt-4 flex flex-col gap-3">
      {Children.map(items, (item, index) => (
        <li className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
      {children}
    </div>
  );
}

export default function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="w-full min-h-screen">
      <Container>
        <div className="flex flex-col py-14 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border bg-muted px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {eyebrow}
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              {description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: <span className="text-foreground">{updated}</span>
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
            <LegalToc items={sections} />

            <div className="max-w-3xl">
              {intro ? <div className="mb-12">{intro}</div> : null}

              <div className="flex flex-col">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24 border-t pt-8 first:border-t-0 first:pt-0 [&+section]:mt-12"
                  >
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                      {section.title}
                    </h2>
                    {section.content}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
