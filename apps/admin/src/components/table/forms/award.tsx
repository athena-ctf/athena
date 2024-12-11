import { apiClient } from "@/utils/api-client";
import { ctf } from "@/utils/ctf-data";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@repo/api";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { ImageIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  value: z.string(),
  prize: z.number(),
  logo_url: z.string().url(),
});

type Schema = z.infer<typeof schema>;

export function AwardForm({
  onSuccess,
}: { onSuccess: (model: components["schemas"]["AwardModel"]) => void }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const uploadFile = async (file: File) => {
    createPreview(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://static.${ctf.domain}/upload/local`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      form.setValue("logo_url", data.url);
      return data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      form.setError("logo_url", {
        type: "manual",
        message: "File upload failed. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadFile(file);
    }
  };

  const createPreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/award", {
      body: values,
    });

    if (resp.error) {
      toast.error("Could not create award");
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="prize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prize</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo_url"
          render={() => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12">
                      <AvatarImage src={previewUrl} />
                      <AvatarFallback>
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleFileChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
