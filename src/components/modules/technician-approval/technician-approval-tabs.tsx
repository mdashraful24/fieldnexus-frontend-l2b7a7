"use client";

import { Suspense, useState } from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ITechnicianApplicationStatus, ITechnicianParams } from "@/types";
import TechnicianApprovalTable from "./technician-approval-table";
import TechnicianApprovalTableLoading from "./technician-approval-table-loading";
import TechnicianReviewSheet from "./technician-approval-sheet";

const verificationStatus: ["ALL" | ITechnicianApplicationStatus, string][] = [
  ["ALL", "All"],
  ["PENDING", "Pending"],
  ["APPROVED", "Approved"],
  ["REJECTED", "Rejected"],
];

export default function TechnicianApprovalTabs() {
  const [tab, setTab] = useState<"ALL" | ITechnicianApplicationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams: ITechnicianParams = {
    page: 1,
    limit: 10,
    ...(tab === "ALL" ? {} : { status: tab }),
    ...(searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}),
  };

  return (
    <Card>
      <CardContent className="flex-1">
        <div className="flex flex-col justify-between gap-3 pb-4 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs
            value={tab}
            onValueChange={(value) =>
              setTab(value as "ALL" | ITechnicianApplicationStatus)
            }
          >
            <TabsList className="w-full justify-start md:w-auto">
              {verificationStatus.map(([value, label]) => (
                <TabsTrigger value={value} key={value} className="flex-1">
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <Suspense fallback={<TechnicianApprovalTableLoading />}>
          <TechnicianApprovalTable {...queryParams} handleReview={setSelectedId} />
        </Suspense>
      </CardContent>

      <TechnicianReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </Card>
  );
}