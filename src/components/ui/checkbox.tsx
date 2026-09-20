"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "cn";
import { CheckIcon, MinusIcon } from "lucide-react";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer relative inline-grid size-4 shrink-0 place-items-center rounded-sm border border-input shadow-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:data-checked:border-primary dark:data-checked:bg-primary",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="grid place-items-center text-current">
        {props.indeterminate ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
