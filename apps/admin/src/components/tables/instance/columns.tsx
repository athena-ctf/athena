import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import { InstanceForm } from "@/components/forms/instance";
import { formatDate } from "@/utils";
import { apiClient } from "@/utils/api-client";
import type { components } from "@repo/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/alert-dialog";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@repo/ui/components/badge";
import { Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type TData = components["schemas"]["InstanceModel"];

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
    cell: ({ getValue }) => getValue(),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("created_at", {
    header: ({ column }) => <ColumnHeader column={column} title="Created At" />,
    cell: ({ table, getValue }) => formatDate(getValue(), table.options.meta?.dateStyle),
  }),
  columnHelper.accessor("updated_at", {
    header: ({ column }) => <ColumnHeader column={column} title="Updated At" />,
    cell: ({ table, getValue }) => formatDate(getValue(), table.options.meta?.dateStyle),
  }),
  columnHelper.accessor("deployment_id", {
    header: ({ column }) => <ColumnHeader column={column} title="Deployment Id" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("container_name", {
    header: ({ column }) => <ColumnHeader column={column} title="Container Name" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-mono">{getValue()}</div>,
  }),
  columnHelper.accessor("container_id", {
    header: ({ column }) => <ColumnHeader column={column} title="Container Id" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-mono">{getValue()}</div>,
  }),
  columnHelper.accessor("port_mapping", {
    header: ({ column }) => <ColumnHeader column={column} title="Port Mapping" />,
    cell: ({ getValue }) => {
      const dependencies = getValue();

      return (
        <div className="flex flex-wrap gap-1">
          {dependencies.length === 0 ? (
            <Minus />
          ) : (
            dependencies.slice(0, 2).map((dependency) => (
              <Badge key={dependency} variant="outline">
                {dependency}
              </Badge>
            ))
          )}
          {dependencies.length > 2 && (
            <Badge variant="outline">+{dependencies.length - 2} more</Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row, table }) => {
      const [isAlertOpen, setIsAlertOpen] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDelete = () => {
        toast.promise(
          async () => {
            const resp = await apiClient.DELETE("/admin/instance/{id}", {
              params: { path: { id: row.original.id } },
            });

            if (resp.error) {
              throw resp.error.message;
            }

            return resp.data;
          },
          {
            loading: "Deleting instance...",
            error: (err: string) => {
              console.error(err);
              return "Could not remove instance";
            },
            success: () => {
              table.options.meta?.removeRow(row.index);
              return "Successfully deleted instance";
            },
          },
        );
      };

      return (
        <>
          <RowActions
            actions={[
              { label: "Details", action() {} },
              { label: "Update", action: () => setIsDialogOpen(true) },
              { label: "Delete", action: () => setIsAlertOpen(true) },
            ]}
          />

          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="overflow-y-auto max-h-screen">
              <DialogHeader>
                <DialogTitle>Update instance</DialogTitle>
              </DialogHeader>
              <InstanceForm
                kind="update"
                defaultValues={row.original}
                onSuccess={(model) => table.options.meta?.updateRow(model, row.index)}
              />
            </DialogContent>
          </Dialog>
        </>
      );
    },
  }),
] as ColumnDef<TData, unknown>[];
