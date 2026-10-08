"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IContactMessageParams } from "@/types";
import AdminContactMessagesTableLoading from "./admin-contact-messages-loading";
import AdminContactMessagesTable from "./admin-contact-messages-table";

type ContactMessageFilter = "all" | "unread";

const filterMeta: Record<
  ContactMessageFilter,
  { label: string; isRead?: boolean }
> = {
  all: { label: "All" },
  unread: { label: "Unread", isRead: false },
};

export default function AdminContactMessages() {
  const [filter, setFilter] = useState<ContactMessageFilter>("all");
  const [page, setPage] = useState(1);

  const currentFilter = filterMeta[filter];

  const queryParams: IContactMessageParams = {
    page,
    limit: 10,
    ...(currentFilter.isRead !== undefined
      ? { isRead: currentFilter.isRead }
      : {}),
  };

  return (
    <Card>
      <CardContent className="flex-1">
        <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-center">
          <Tabs
            value={filter}
            onValueChange={(value) => {
              setFilter(value as ContactMessageFilter);
              setPage(1);
            }}
            className="md:ml-auto"
          >
            <TabsList className="w-full justify-start md:w-auto">
              {(Object.keys(filterMeta) as ContactMessageFilter[]).map(
                (key) => (
                  <TabsTrigger value={key} key={key} className="flex-1">
                    {filterMeta[key].label}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<AdminContactMessagesTableLoading />}>
          <AdminContactMessagesTable
            {...queryParams}
            handlePageChange={setPage}
          />
        </Suspense>
      </CardContent>
    </Card>
  );
}
