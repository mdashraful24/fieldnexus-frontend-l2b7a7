"use client";

import { Plus, Search, X } from "lucide-react";
import { type ChangeEvent, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDebounce from "@/hooks/debounce.hook";
import type {
  IServiceCategory,
  IServiceCategoryParams,
  ServiceCategoryListFilter,
} from "@/types";
import ServiceCategoryFormModal from "./service-category-form-modal";
import ServiceCategoryTable from "./service-category-table";
import ServiceCategoryTableLoading from "./service-category-table-loading";

const listTabs: ServiceCategoryListFilter[] = ["ALL", "DELETED"];

export default function ServiceCategoryTabs() {
  const [listTab, setListTab] = useState<ServiceCategoryListFilter>("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<IServiceCategory | null>(null);

  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setPage(1);
  };

  const handleCreate = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category: IServiceCategory) => {
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const queryParams: IServiceCategoryParams = {
    page,
    limit: 10,
    ...(debouncedSearch ? { searchTerm: debouncedSearch } : {}),
    ...(listTab === "DELETED" ? { includeDeleted: true } : {}),
  };

  return (
    <>
      <Card>
        <CardContent className="flex-1">
          <div className="flex flex-col justify-between gap-3 pb-4 lg:flex-row lg:items-center">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories by name or description"
                value={searchInput}
                onChange={(e) => handleSearch(e)}
                className="h-9 rounded-lg pr-9 pl-9 shadow-sm [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden"
              />
              {searchInput && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={handleClearSearch}
                  className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Tabs
                value={listTab}
                onValueChange={(value) => {
                  setListTab(value as ServiceCategoryListFilter);
                  setPage(1);
                }}
              >
                <TabsList className="w-full justify-start md:w-auto">
                  {listTabs.map((tab) => (
                    <TabsTrigger value={tab} key={tab} className="flex-1">
                      {tab === "ALL"
                        ? "All"
                        : tab.charAt(0).toUpperCase() +
                          tab.slice(1).toLowerCase()}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <Button size="sm" onClick={handleCreate}>
                <Plus />
                Create Category
              </Button>
            </div>
          </div>

          <Suspense fallback={<ServiceCategoryTableLoading />}>
            <ServiceCategoryTable
              {...queryParams}
              listFilter={listTab}
              handleEdit={handleEdit}
              handlePageChange={setPage}
            />
          </Suspense>
        </CardContent>
      </Card>

      <ServiceCategoryFormModal
        open={modalOpen}
        category={selectedCategory}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
