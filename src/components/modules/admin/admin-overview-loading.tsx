import { Skeleton } from "@/components/ui/skeleton";

const cardKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function AdminOverviewLoading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cardKeys.map((card) => (
          <div
            key={card}
            className="flex items-center gap-4 rounded-xl border bg-card p-4"
          >
            <Skeleton className="size-11 shrink-0 rounded-xl" />
            <div className="w-full space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border bg-card p-4">
            <Skeleton className="h-4 w-40" />
            <div className="mt-4 space-y-3">
              {[1, 2, 3, 4].map((row) => (
                <Skeleton key={row} className="h-2.5 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
