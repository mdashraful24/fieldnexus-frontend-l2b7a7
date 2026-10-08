"use client";

import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import WorkOrderStatusBadge from "@/components/modules/work-order/work-order-status-badge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllWorkOrders, useGetServiceCategoryById } from "@/hooks";
import type { IServiceCategory } from "@/types";

function Detail({
  label,
  value,
  children,
}: {
  label: string;
  value?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 break-words text-sm whitespace-pre-wrap">
        {children ?? value ?? "—"}
      </p>
    </div>
  );
}

export default function ServiceCategoryDetailsSheet({
  selectedId,
  onClose,
}: {
  selectedId: string;
  onClose: () => void;
}) {
  const { data, isLoading, isError } = useGetServiceCategoryById(selectedId);

  const category = data?.data;

  return (
    <Sheet open={!!selectedId} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="overflow-hidden">
        <SheetHeader className="shrink-0 pr-12">
          <div className="min-w-0">
            <SheetTitle className="flex items-center gap-2 break-all">
              {category?.name ?? "Service Category"}
              {category && (
                <Badge variant={category.isActive ? "default" : "secondary"}>
                  {category.isActive ? "Active" : "Inactive"}
                </Badge>
              )}
            </SheetTitle>
            <SheetDescription className="break-all">
              {category?.description ??
                "Category details and related work orders."}
            </SheetDescription>
          </div>
        </SheetHeader>

        <ServiceCategoryDetailsTabs
          key={selectedId}
          categoryId={selectedId}
          isLoading={isLoading}
          isError={isError}
          category={category}
        />
      </SheetContent>
    </Sheet>
  );
}

function ServiceCategoryDetailsTabs({
  categoryId,
  isLoading,
  isError,
  category,
}: {
  categoryId: string;
  isLoading: boolean;
  isError: boolean;
  category?: IServiceCategory;
}) {
  const {
    data: workOrdersData,
    isLoading: workOrdersLoading,
    isError: workOrdersError,
  } = useGetAllWorkOrders(
    { categoryId, limit: 20, page: 1 },
    { enabled: !!categoryId },
  );

  const workOrders = workOrdersData?.data ?? [];
  const totalWorkOrders = workOrdersData?.meta?.total ?? 0;

  return (
    <Tabs defaultValue="details" className="flex min-h-0 flex-1 flex-col gap-3">
      <TabsList className="w-full shrink-0 justify-start md:w-auto">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="work-orders">Work Orders</TabsTrigger>
      </TabsList>

      <TabsContent
        value="details"
        className="flex min-h-0 flex-col gap-4 overflow-y-auto px-1 pb-4"
      >
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <Skeleton key={row} className="h-10 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-foreground">
            This service category could not be loaded. It may have been deleted.
          </p>
        )}

        {category && (
          <>
            <div className="space-y-4">
              <Detail label="Name" value={category.name} />
              <Detail label="Description" value={category.description} />
              <Detail
                label="Base Price"
                value={
                  category.basePrice === null ||
                  category.basePrice === undefined ||
                  Number.isNaN(Number(category.basePrice))
                    ? undefined
                    : `৳${Number(category.basePrice).toLocaleString()}`
                }
              />
              <Detail
                label="Status"
                value={category.isActive ? "Active" : "Inactive"}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <Detail
                label="Created At"
                value={new Date(category.createdAt).toLocaleString()}
              />
              <Detail
                label="Last Updated"
                value={new Date(category.updatedAt).toLocaleString()}
              />
              <Detail
                label="Deleted"
                value={category.isDeleted ? "Yes" : "No"}
              />
            </div>
          </>
        )}
      </TabsContent>

      <TabsContent
        value="work-orders"
        className="flex min-h-0 flex-col gap-3 overflow-y-auto px-1 pb-4"
      >
        {workOrdersLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((row) => (
              <Skeleton key={row} className="h-16 w-full" />
            ))}
          </div>
        )}

        {workOrdersError && (
          <p className="text-sm text-muted-foreground">
            Work orders for this category could not be loaded.
          </p>
        )}

        {!workOrdersLoading && !workOrdersError && (
          <>
            <p className="text-xs font-medium text-muted-foreground">
              {totalWorkOrders === 0
                ? "No work orders in this category yet."
                : `${totalWorkOrders} work order${totalWorkOrders === 1 ? "" : "s"} in this category${
                    workOrders.length < totalWorkOrders
                      ? ` (showing first ${workOrders.length})`
                      : ""
                  }`}
            </p>

            {workOrders.length === 0 ? (
              <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-8 text-muted-foreground">
                <Inbox className="size-8 opacity-50" />
                <p className="text-sm">Nothing to show here.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {workOrders.map((workOrder) => (
                  <div
                    key={workOrder.id}
                    className="rounded-lg border bg-muted/40 p-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-mono text-xs font-medium text-muted-foreground">
                        {workOrder.workOrderNumber}
                      </p>
                      <WorkOrderStatusBadge status={workOrder.status} />
                    </div>
                    <p className="mt-1 truncate text-sm font-medium">
                      {workOrder.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Created {new Date(workOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </TabsContent>
    </Tabs>
  );
}
