import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import { ContainerForm } from "@/components/forms/container";
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
import { Badge } from "@ui/components/ui/badge";
import { Minus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type TData = components["schemas"]["ContainerModel"];

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
  columnHelper.accessor("name", {
    header: ({ column }) => <ColumnHeader column={column} title="Name" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("image", {
    header: ({ column }) => <ColumnHeader column={column} title="Image" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("internal", {
    header: ({ column }) => <ColumnHeader column={column} title="Internal" />,
    cell: ({ getValue }) => (
      <Badge variant="outline" className="font-mono">
        {getValue() ? "true" : "false"}
      </Badge>
    ),
    filterFn(row, id, value) {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("memory_limit", {
    header: ({ column }) => <ColumnHeader column={column} title="Memory Limit" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("command", {
    header: ({ column }) => <ColumnHeader column={column} title="Command" />,
    cell: ({ getValue }) => (
      <div className="font-mono bg-gray-200 rounded-sm max-w-[350px] p-1 text-xs truncate font-medium">
        {getValue()}
      </div>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("challenge_id", {
    header: ({ column }) => <ColumnHeader column={column} title="Challenge Id" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("depends_on", {
    header: ({ column }) => <ColumnHeader column={column} title="Dependencies" />,
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
  columnHelper.accessor("networks", {
    header: ({ column }) => <ColumnHeader column={column} title="Networks" />,
    cell: ({ getValue }) => {
      const networks = getValue();

      return (
        <div className="flex flex-wrap gap-1">
          {networks.length === 0 ? (
            <Minus />
          ) : (
            networks.slice(0, 2).map((network) => (
              <Badge key={network} variant="outline">
                {network}
              </Badge>
            ))
          )}
          {networks.length > 2 && <Badge variant="outline">+{networks.length - 2} more</Badge>}
        </div>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor("ports", {
    header: ({ column }) => <ColumnHeader column={column} title="Ports" />,
    cell: ({ getValue }) => {
      const ports = getValue();

      return (
        <div className="flex flex-wrap gap-1 min-w-20">
          {ports.length === 0 ? (
            <Minus />
          ) : (
            ports.slice(0, 2).map((port) => (
              <Badge key={port} variant="outline">
                {port}
              </Badge>
            ))
          )}
          {ports.length > 2 && <Badge variant="outline">+{ports.length - 2} more</Badge>}
        </div>
      );
    },
    enableSorting: false,
  }),
  columnHelper.accessor("environment", {
    header: ({ column }) => <ColumnHeader column={column} title="Environment" />,
    cell: ({ getValue }) => {
      const environment = getValue();

      return (
        <div className="flex flex-wrap gap-1">
          {environment.length === 0 ? (
            <Minus />
          ) : (
            environment.slice(0, 2).map((env) => (
              <Badge key={env} variant="outline">
                {env}
              </Badge>
            ))
          )}
          {environment.length > 2 && (
            <Badge variant="outline">+{environment.length - 2} more</Badge>
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
            const resp = await apiClient.DELETE("/admin/container/{id}", {
              params: { path: { id: row.original.id } },
            });

            if (resp.error) {
              throw resp.error.message;
            }

            return resp.data;
          },
          {
            loading: "Deleting container...",
            error: (err: string) => {
              console.error(err);
              return "Could not remove container";
            },
            success: () => {
              table.options.meta?.removeRow(row.index);
              return "Successfully deleted container";
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
                <DialogTitle>Update container</DialogTitle>
              </DialogHeader>
              <ContainerForm
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
