import { DataTable } from "@/components/data-table";
import type { ToolbarActionProps } from "@/components/data-table/toolbar-action";
import { FileUploadDialog } from "@/components/file-upload";
import { FlagForm } from "@/components/forms/flag";
import { apiClient } from "@/utils/api-client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/dialog";
import { Download, PlusCircle, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type TData, columns } from "./columns";

export function FlagTable() {
  const [data, setData] = useState<TData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const onFileUpload = async (file: File) => {
    apiClient.POST("/admin/flag/import", {
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
    apiClient.GET("/admin/flag").then((res) => {
      if (res.error) {
        toast.error("Could not fetch data");
        console.error(res.error.message);
      } else {
        setData(res.data);
      }
    });
  }, []);

  const actions: ToolbarActionProps[] = [
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
        apiClient
          .GET("/admin/flag/export", {
            params: { query: { format: selected as "csv" | "xml" | "json" } },
            parseAs: "blob",
          })
          .then((res) => {
            if (res.data) {
              const url = URL.createObjectURL(res.data);
              const a = document.createElement("a");
              a.href = url;
              a.download = `flag.${selected}`;

              document.body.appendChild(a);

              a.click();
              a.remove();

              URL.revokeObjectURL(url);
            }
          });
      },
    },
    {
      kind: "button",
      label: "Import",
      icon: Download,
      action() {
        setIsUploadOpen(true);
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
  ];

  return (
    <>
      <DataTable data={data} columns={columns} filters={[]} actions={actions} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Create flag</DialogTitle>
          </DialogHeader>
          <FlagForm kind="create" onSuccess={(model) => setData([...data, model])} />
        </DialogContent>
      </Dialog>

      <FileUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFileUpload={onFileUpload}
      />
    </>
  );
}
