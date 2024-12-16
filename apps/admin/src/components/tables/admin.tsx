import { DataTable } from "@/components/data-table";
import { ColumnHeader } from "@/components/data-table/column-header";
import { RowActions } from "@/components/data-table/row-actions";
import { AdminForm } from "@/components/forms/admin";
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
import { Badge } from "@repo/ui/components/badge";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Download, PlusCircle, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate } from "./utils";
import { FileUploadDialog } from "../file-upload";

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
  columnHelper.accessor("username", {
    header: ({ column }) => <ColumnHeader column={column} title="Username" />,
    cell: ({ getValue }) => <div className="max-w-[350px] truncate font-medium">{getValue()}</div>,
  }),
  columnHelper.accessor("role", {
    header: ({ column }) => <ColumnHeader column={column} title="Role" />,
    cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  }),
  columnHelper.display({
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    cell: ({ row, table }) => {
      const [isAlertOpen, setIsAlertOpen] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const handleDelete = () => {
        toast.promise(
          async () => {
            const resp = await apiClient.DELETE("/admin/admin/{id}", {
              params: { path: { id: row.original.id } },
            });

            if (resp.error) {
              throw resp.error.message;
            }

            return resp.data;
          },
          {
            loading: "Deleting admin...",
            error: (err: string) => {
              console.error(err);
              return "Could not remove admin";
            },
            success: () => {
              table.options.meta?.removeRow(row.index);
              return "Successfully deleted admin";
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
                <DialogTitle>Update admin</DialogTitle>
              </DialogHeader>
              <AdminForm
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

export function AdminTable() {
  const [data, setData] = useState<TData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onFileUpload = async (file: File) => {
    apiClient.POST("/admin/admin/import", {
      body: {
        file,
      },
      bodySerializer: (body) => {
        const formData = new FormData();
        formData.set("file", body.file);
        return formData;
      },
    });
  };

  useEffect(() => {
    apiClient.GET("/admin/admin").then((res) => {
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
        search="username"
        filters={[
          {
            columnName: "role",
            title: "Role",
            options: [
              { label: "Analyst", value: "analyst" },
              { label: "Editor", value: "editor" },
              { label: "Judge", value: "judge" },
              { label: "Manager", value: "manager" },
              { label: "Moderator", value: "moderator" },
            ],
          },
        ]}
        actions={[
          {
            kind: "dropdown",
            label: "Export",
            icon: Upload,
            options: [
              { value: "csv", label: "as CSV" },
              { value: "xml", label: "as XML" },
              { value: "json", label: "as JSON" },
            ],
            action(selected) {
              apiClient.GET("/admin/admin/export", {
                params: { query: { format: selected as "csv" | "xml" | "json" } },
                parseAs: "stream",
              });
            },
          },
          {
            kind: "button",
            label: "Import",
            icon: Download,
            action() {
              // TODO: add import logic
            },
          },
          {
            kind: "button",
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
            <DialogTitle>Update admin</DialogTitle>
          </DialogHeader>
          <AdminForm
            kind="create"
            onSuccess={(model) => {
              setData([...data, model]);
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <FileUploadDialog onFileUpload={onFileUpload} />
    </>
  );
}
