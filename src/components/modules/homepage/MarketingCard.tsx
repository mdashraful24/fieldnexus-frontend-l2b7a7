import { cn } from "cn";
import type { ComponentProps } from "react";
import { Card } from "@/components/ui/card";

function MarketingCard({ className, ...props }: ComponentProps<typeof Card>) {
  return (
    <Card
      data-slot="marketing-card"
      className={cn(
        "group h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
        className,
      )}
      {...props}
    >
      {props.children}
    </Card>
  );
}

function MarketingCardIcon({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="marketing-card-icon"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export { MarketingCard, MarketingCardIcon };
