import { cn } from "cn";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: {
  label: string;
  width: string;
  align?: "right";
  className?: string;
}[] = [
  { label: "#", width: "w-8" },
  { label: "Invoice", width: "w-36" },
  { label: "Work Order", width: "w-44", className: "hidden md:table-cell" },
  { label: "Customer", width: "w-32" },
  { label: "Amount", width: "w-24" },
  { label: "Status", width: "w-24" },
  { label: "Date", width: "w-36", className: "hidden md:table-cell" },
  { label: "Refund", width: "w-16" },
];

export default function AdminPaymentsTableLoading() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.label}
                className={cn(
                  column.align === "right" ? "text-right" : undefined,
                  column.className,
                )}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((row) => (
            <TableRow key={row}>
              {columns.map((column) => (
                <TableCell
                  key={column.label}
                  className={cn(
                    column.align === "right" ? "text-right" : undefined,
                    column.className,
                  )}
                >
                  <Skeleton
                    className={
                      column.align === "right"
                        ? `ml-auto h-7 ${column.width}`
                        : `h-5 ${column.width}`
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
