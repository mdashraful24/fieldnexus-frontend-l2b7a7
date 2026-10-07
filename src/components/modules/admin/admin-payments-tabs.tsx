"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PaymentStatus } from "@/types";
import AdminPaymentsTable from "./admin-payments-table";
import AdminPaymentsTableLoading from "./admin-payments-table-loading";

const filters: { label: string; value?: PaymentStatus }[] = [
  { label: "All" },
  { label: "Paid", value: "PAID" },
  { label: "Unpaid", value: "UNPAID" },
  { label: "Failed", value: "FAILED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Refunded", value: "REFUNDED" },
];

export default function AdminPaymentsTabs() {
  const [status, setStatus] = useState<PaymentStatus | undefined>(undefined);
  const [page, setPage] = useState(1);

  const queryParams = {
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc" as const,
    ...(status ? { status } : {}),
  };

  return (
    <Card>
      <CardContent className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.label}
                size="sm"
                variant={status === filter.value ? "default" : "outline"}
                onClick={() => {
                  setStatus(filter.value);
                  setPage(1);
                }}
                className="h-8"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        <Suspense fallback={<AdminPaymentsTableLoading />}>
          <AdminPaymentsTable {...queryParams} handlePageChange={setPage} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
