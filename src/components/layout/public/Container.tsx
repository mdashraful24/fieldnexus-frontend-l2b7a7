import type { ReactNode } from "react";
import { cn } from "cn";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 sm:max-w-150 md:max-w-185 lg:max-w-255 xl:max-w-7xl 2xl:max-w-410 3xl:max-w-[1710px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
