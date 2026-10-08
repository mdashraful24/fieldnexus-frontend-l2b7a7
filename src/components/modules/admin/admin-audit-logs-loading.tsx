import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const columns: { label: string; width: string; className?: string }[] = [
  { label: "Date", width: "w-36" },
  { label: "Action", width: "w-36" },
  { label: "Entity", width: "w-32" },
  { label: "Actor", width: "w-40" },
  { label: "Changes", width: "w-60", className: "hidden md:table-cell" },
];

export default function AdminAuditLogsTableLoading() {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.label} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 3, 4].map((row) => (
            <TableRow key={row}>
              {columns.map((column) => (
                <TableCell key={column.label} className={column.className}>
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
