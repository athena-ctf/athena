import { DataTable } from "@/components/data-table";
import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import { ChallengeForm } from "@/components/forms/challenge";
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
import { Badge } from "@ui/components/ui/badge";
import { ctf } from "@/utils/ctf-data";

type TData = components["schemas"]["ChallengeModel"];

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
  columnHelper.accessor("title", {
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("author_name", {
    header: ({ column }) => <ColumnHeader column={column} title="Author name" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
    enableSorting: false,
  }),
  columnHelper.accessor("description", {
    header: ({ column }) => <ColumnHeader column={column} title="Description" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
    enableSorting: false,
  }),
  columnHelper.accessor("points", {
    header: ({ column }) => <ColumnHeader column={column} title="Points" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("kind", {
    header: ({ column }) => <ColumnHeader column={column} title="Kind" />,
    cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.accessor("level", {
    header: ({ column }) => <ColumnHeader column={column} title="Level" />,
    cell: ({ getValue }) => (
      <Badge variant="outline" className="text-nowrap">
        {ctf.levels.find((level) => level.value === getValue())?.name}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
            const resp = await apiClient.DELETE("/admin/challenge/{id}", {
              params: { path: { id: row.original.id } },
            });

            if (resp.error) {
              throw resp.error.message;
            }

            return resp.data;
          },
          {
            loading: "Deleting challenge...",
            error: (err: string) => {
              console.error(err);
              return "Could not remove challenge";
            },
            success: () => {
              table.options.meta?.removeRow(row.index);
              return "Successfully deleted challenge";
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
                <DialogTitle>Update challenge</DialogTitle>
              </DialogHeader>
              <ChallengeForm
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

export function ChallengeTable() {
  const [data, setData] = useState<TData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    apiClient.GET("/admin/challenge").then((res) => {
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
        search="title"
        filters={[
          {
            columnName: "kind",
            title: "Challenge kind",
            options: [
              { label: "Dynamic Containerized", value: "dynamic_containerized" },
              { label: "Static Containerized", value: "static_containerized" },
              { label: "Regex Flag", value: "regex_flag" },
              { label: "Static Flag", value: "static_flag" },
            ],
          },
          {
            columnName: "level",
            title: "Level",
            options: ctf.levels.map((level) => ({
              label: level.name,
              value: level.value,
            })),
          },
        ]}
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
            <DialogTitle>Create challenge</DialogTitle>
          </DialogHeader>
          <ChallengeForm kind="create" onSuccess={(model) => setData([...data, model])} />
        </DialogContent>
      </Dialog>
    </>
  );
}
