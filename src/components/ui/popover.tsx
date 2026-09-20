"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverPortal({ ...props }: PopoverPrimitive.Portal.Props) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 8,
  children,
  ...props
}: PopoverPrimitive.Positioner.Props & {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Positioner
        data-slot="popover-positioner"
        align={align}
        sideOffset={sideOffset}
        className="z-50"
        {...props}
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "min-w-72 max-w-[calc(100vw-2rem)] rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none transition-[transform,opacity,scale] duration-150 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 dark:bg-popover",
            className,
          )}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPortal>
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-heading text-sm font-semibold", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("mt-0.5 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
};
