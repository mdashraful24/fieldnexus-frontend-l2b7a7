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
  { label: "Name", width: "w-52" },
  { label: "Base Price", width: "w-28" },
  { label: "Status", width: "w-24" },
  { label: "Created", width: "w-40" },
  { label: "Actions", width: "w-20", align: "right" },
];

export default function ServiceCategoryTableLoading() {
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
