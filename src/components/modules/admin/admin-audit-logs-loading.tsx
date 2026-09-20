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
  { label: "Date", width: "w-36" },
  { label: "Action", width: "w-36" },
  { label: "Entity", width: "w-32" },
  { label: "Actor", width: "w-40" },
  { label: "Changes", width: "w-60" },
];

export default function AdminAuditLogsTableLoading() {
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
