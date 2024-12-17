import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Progress } from "@repo/ui/components/progress";

interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileUpload: (file: File) => Promise<void>;
}

export function FileUploadDialog({ open, onOpenChange, onFileUpload }: FileUploadDialogProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setIsUploading(true);
        try {
          await onFileUpload(acceptedFiles[0]);
        } finally {
          setIsUploading(false);
          onOpenChange(false);
        }
      }
    },
    [onOpenChange, onFileUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
