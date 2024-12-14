import { DataTable } from "@/components/data-table";
import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import { FlagForm } from "@/components/forms/flag";
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
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "./utils";

type TData = components["schemas"]["FlagModel"];

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
  columnHelper.accessor("reason", {
    header: ({ column }) => <ColumnHeader column={column} title="Value" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("duration", {
    header: ({ column }) => <ColumnHeader column={column} title="Prize" />,
    cell: ({ getValue }) => (
      <div className="max-w-[350px] truncate font-medium">
        {getValue()} {getValue() > 1 ? "days" : "day"}
      </div>
    ),
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
            const resp = await apiClient.DELETE("/admin/flag/{id}", {
              params: { path: { id: row.original.id } },
            });

            if (resp.error) {
              throw resp.error.message;
            }

            return resp.data;
          },
          {
            loading: "Deleting flag...",
            error: (err: string) => {
              console.error(err);
              return "Could not remove flag";
            },
            success: () => {
              table.options.meta?.removeRow(row.index);
              return "Successfully deleted flag";
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Update flag</DialogTitle>
              </DialogHeader>
              <FlagForm
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

export function FlagTable() {
  const [data, setData] = useState<TData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    apiClient.GET("/admin/flag").then((res) => {
      if (res.error) {
        toast.error("Could not fetch data");
        console.error(res.error.message);
      } else {
        setData(res.data);
      }
    });
  }, []);

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        search="reason"
        filters={[]}
        actions={[
          {
            label: "New",
            icon: PlusCircle,
            action() {
              setIsDialogOpen(true);
            },
          },
        ]}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create flag</DialogTitle>
          </DialogHeader>
          <FlagForm kind="create" onSuccess={(model) => setData([...data, model])} />
        </DialogContent>
      </Dialog>
    </>
  );
}
