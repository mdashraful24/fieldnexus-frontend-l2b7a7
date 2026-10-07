import { Skeleton } from "@/components/ui/skeleton";

export default function AdminOverviewLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder rows
            key={index}
            className="flex flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <Skeleton className="size-10 rounded-xl" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="mt-4 h-4 w-32" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded-xl bg-card p-5 ring-1 ring-foreground/10"
          >
            <div className="space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="mx-auto mt-6 h-40 w-full rounded-lg" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        ))}

        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
          <Skeleton className="mx-auto mt-6 size-32 rounded-full" />
          <div className="mt-5 grid grid-cols-2 gap-3 border-t pt-4">
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-12" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-6 w-12" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
        <div className="space-y-2">
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-72" />
        </div>
        <Skeleton className="mt-6 h-72 w-full rounded-lg" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-3 w-28" />
          </div>
          <div className="mt-5 space-y-4">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-card p-5 ring-1 ring-foreground/10">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-52" />
          </div>
          <div className="mt-5 space-y-3">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <Skeleton className="size-4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
