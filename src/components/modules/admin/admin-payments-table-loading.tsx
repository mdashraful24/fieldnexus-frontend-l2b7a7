import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: { label: string; width: string; align?: "right" }[] = [
  { label: "#", width: "w-8" },
  { label: "Invoice", width: "w-36" },
  { label: "Work Order", width: "w-44" },
  { label: "Customer", width: "w-32" },
  { label: "Amount", width: "w-24" },
  { label: "Status", width: "w-24" },
  { label: "Date", width: "w-36" },
  { label: "Actions", width: "w-16", align: "right" },
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
                className={column.align === "right" ? "text-right" : undefined}
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
                  className={
                    column.align === "right" ? "text-right" : undefined
                  }
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
