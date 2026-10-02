"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

function Accordion({ ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionHeader({
  className,
  ...props
}: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn("flex", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      className={cn(
        "group flex flex-1 items-center justify-between gap-4 py-4 text-left font-heading text-base font-medium transition-colors outline-none hover:text-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[panel-open]:text-primary",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-icon="inline-end"
        className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[panel-open]:rotate-180"
      />
    </AccordionPrimitive.Trigger>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 data-[open]:h-(--accordion-panel-height)",
        className,
      )}
      {...props}
    >
      <div className="pb-4 text-muted-foreground">{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
};
