import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: { label: string; width: string }[] = [
  { label: "#", width: "w-8" },
  { label: "Work Order", width: "w-44" },
  { label: "Customer", width: "w-32" },
  { label: "Category", width: "w-32" },
  { label: "Priority", width: "w-20" },
  { label: "Status", width: "w-24" },
  { label: "Created", width: "w-36" },
  { label: "Approve / Assign", width: "w-32" },
  { label: "Update", width: "w-20" },
  { label: "Details", width: "w-20" },
  { label: "Delete", width: "w-20" },
];

export default function AdminWorkOrdersTableLoading() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.label}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((row) => (
            <TableRow key={row}>
              {columns.map((column) => (
                <TableCell key={column.label}>
                  <Skeleton className={`h-5 ${column.width}`} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
