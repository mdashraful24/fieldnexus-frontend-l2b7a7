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
  { label: "Name", width: "w-44" },
  { label: "Email", width: "w-52" },
  { label: "Contact", width: "w-28" },
  // { label: "Service Areas", width: "w-32" },
  { label: "Status", width: "w-24" },
  { label: "Approval", width: "w-24" },
  { label: "Performance", width: "w-24" },
  { label: "Details", width: "w-20" },
  { label: "Restore", width: "w-20" },
];

export default function AdminVendorsTableLoading() {
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
