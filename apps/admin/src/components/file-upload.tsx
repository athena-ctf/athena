import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Progress } from "@repo/ui/components/progress";

interface FileUploadDialogProps {
  onFileUpload: (file: File) => Promise<void>;
}

export function FileUploadDialog({ onFileUpload }: FileUploadDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        try {
          await onFileUpload(acceptedFiles[0]);
        } finally {
          setIsUploading(false);
          setOpen(false);
        }
      }
    },
    [onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Upload File</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Drag and drop a file here or click to select a file.
          </DialogDescription>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer ${
            isDragActive ? "border-primary" : "border-muted-foreground"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            {isDragActive
              ? "Drop the file here"
              : "Drag & drop a file here, or click to select a file"}
          </p>
        </div>
        {isUploading && (
          <div className="mt-4">
            <Progress value={undefined} className="w-full" />
            <p className="text-sm text-center mt-2">Uploading...</p>
          </div>
        )}
        <DialogFooter>
          <Button type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
