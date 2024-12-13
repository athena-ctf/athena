import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import type { components } from "@repo/api";
import { Badge } from "@repo/ui/components/badge";
import { Checkbox } from "@repo/ui/components/checkbox";
import { createColumnHelper } from "@tanstack/react-table";

type TData = components["schemas"]["AdminModel"];

const columnHelper = createColumnHelper<TData>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("id", {
    header: ({ column }) => <ColumnHeader column={column} title="ID" />,
    cell: ({ row }) => row.getValue("id"),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("created_at", {
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => row.getValue("created_at"),
  }),
  columnHelper.accessor("updated_at", {
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
    cell: ({ row }) => row.getValue("id"),
  }),
  columnHelper.accessor("username", {
    header: ({ column }) => <ColumnHeader column={column} title="Username" />,
    cell: ({ row }) => (
      <div className="max-w-[500px] truncate font-medium">{row.getValue("username")}</div>
    ),
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <Badge variant="outline">{row.getValue("role")}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => (
      <RowActions
        actions={[
          { key: "Details", action() {} },
          { key: "Update", action() {} },
          { key: "Delete", action() {} },
        ]}
      />
    ),
  }),
];
