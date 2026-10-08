"use client";

import { Building2, Inbox, Pencil, RotateCcw, Trash2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TablePagination from "@/components/ui/table-pagination";
import { toast } from "@/components/ui/toast";
import {
  useDeleteServiceCategory,
  useRestoreServiceCategory,
  useSuspenseGetAllServiceCategories,
} from "@/hooks";
import { getApiErrorMessage } from "@/lib/apiError";
import type {
  IServiceCategory,
  IServiceCategoryParams,
  ServiceCategoryListFilter,
} from "@/types";
import ServiceCategoryDetailsSheet from "./service-category-details-sheet";

function DeleteCategoryPopover({ category }: { category: IServiceCategory }) {
  const { mutate: deleteServiceCategory, isPending: isDeleting } =
    useDeleteServiceCategory();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteServiceCategory(category.id, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description: res?.message || "Service category deleted successfully.",
          type: "success",
        });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while deleting the service category.",
          ),
          type: "error",
        });
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" title="Delete" />}
      >
        <Trash2 className="size-4 text-destructive" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverTitle>Delete {category.name}?</PopoverTitle>
        <PopoverDescription>
          The category will be removed from the active list. You can restore it
          later from the Deleted tab.
        </PopoverDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Delete Category"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function RestoreCategoryPopover({ category }: { category: IServiceCategory }) {
  const { mutate: restoreServiceCategory, isPending: isRestoring } =
    useRestoreServiceCategory();
  const [open, setOpen] = useState(false);

  const handleRestore = () => {
    restoreServiceCategory(category.id, {
      onSuccess: (res) => {
        toast.add({
          title: "Success",
          description:
            res?.message || "Service category restored successfully.",
          type: "success",
        });
        setOpen(false);
      },
      onError: (err) => {
        toast.add({
          title: "Error",
          description: getApiErrorMessage(
            err,
            "An error occurred while restoring the service category.",
          ),
          type: "error",
        });
      },
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" size="icon" title="Restore" />}
      >
        <RotateCcw className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <PopoverTitle>Restore {category.name}?</PopoverTitle>
        <PopoverDescription>
          The category will be brought back and appear in the active list.
        </PopoverDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
            disabled={isRestoring}
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleRestore} disabled={isRestoring}>
            {isRestoring ? (
              <>
                <Spinner />
                Restoring...
              </>
            ) : (
              "Restore Category"
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface ServiceCategoryTableProps extends IServiceCategoryParams {
  listFilter: ServiceCategoryListFilter;
  handleEdit: (category: IServiceCategory) => void;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

function StatusNote() {
  return <span className="text-base font-bold text-muted-foreground">—</span>;
}

export default function ServiceCategoryTable({
  listFilter,
  handleEdit,
  handlePageChange,
  ...params
}: ServiceCategoryTableProps) {
  const { data } = useSuspenseGetAllServiceCategories(params);
  const [detailsId, setDetailsId] = useState("");

  const categories = data?.data ?? [];
  const displayedCategories =
    listFilter === "DELETED"
      ? categories.filter((category) => category.isDeleted)
      : categories;
  const totalPages = data?.meta?.totalPages ?? 0;
  const page = params.page ?? 1;
  const limit = params.limit ?? 10;

  useEffect(() => {
    if (page > 1 && (totalPages === 0 || page > totalPages)) {
      handlePageChange(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages, page, handlePageChange]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
              <TableHead>Restore</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Inbox className="size-8 opacity-50" />
                    <p className="text-sm">No service categories found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              displayedCategories.map((category, index) => (
                <TableRow key={category.id} data-deleted={category.isDeleted}>
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                  <TableCell className="max-w-64">
                    <p className="truncate font-medium">{category.name}</p>
                    {category.description ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {category.description}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    {category.basePrice === null ||
                    category.basePrice === undefined
                      ? "—"
                      : `৳${category.basePrice.toLocaleString()}`}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={category.isActive ? "default" : "secondary"}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(category.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {category.isDeleted ? (
                      <StatusNote />
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        title="Edit"
                        onClick={() => handleEdit(category)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {category.isDeleted ? (
                      <StatusNote />
                    ) : (
                      <DeleteCategoryPopover category={category} />
                    )}
                  </TableCell>
                  <TableCell>
                    {category.isDeleted ? (
                      <RestoreCategoryPopover category={category} />
                    ) : (
                      <StatusNote />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      title="Details"
                      onClick={() => setDetailsId(category.id)}
                    >
                      <Building2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <TablePagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>

      <ServiceCategoryDetailsSheet
        selectedId={detailsId}
        onClose={() => setDetailsId("")}
      />
    </>
  );
}
