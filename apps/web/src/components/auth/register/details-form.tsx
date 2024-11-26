import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "@/stores/register";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PasswordInput } from "@repo/ui/components/password-input";
import { useState } from "react";
import { ImageIcon, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { apiClient } from "@/utils/api-client";
import { ctf } from "@/utils/ctf-data";

const detailsSchema = z
  .object({
    avatarUrl: z.string(),
    displayName: z.string().max(100),
    username: z.string().min(2).max(100),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    email: z.string().email(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword !== password, {
    message: "The passwords did not match",
  });

export function DetailsForm({ next }: { next: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    mode: "onChange",
  });

  const { setAvatarUrl, setDisplayName, setEmail, setPassword, setUsername } = useRegisterStore();

  const uploadFile = async (file: File) => {
    createPreview(file);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`static.${ctf.domain}/upload/local`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      form.setValue("avatarUrl", data.url);
      return data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      form.setError("avatarUrl", {
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

  const onSubmit = async (values: z.infer<typeof detailsSchema>) => {
    const resp = await apiClient.GET("/auth/player/register/verify/email", {
      params: { query: { email: values.email } },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      setAvatarUrl(values.avatarUrl);
      setDisplayName(values.displayName);
      setEmail(values.email);
      setPassword(values.password);
      setUsername(values.username);

      next();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="avatarUrl"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" search={{ next: "" }} className="underline">
            Login
          </Link>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
