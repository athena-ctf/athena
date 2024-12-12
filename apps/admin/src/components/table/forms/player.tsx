import { apiClient } from "@/utils/api-client";
import { ctf } from "@/utils/ctf-data";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@repo/api";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { PasswordInput } from "@ui/components/ui/password-input";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/ui/popover";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown, ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const schema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  team_id: z.string().uuid(),
  ban_id: z.string().uuid().optional().nullable(),
  discord_id: z.string().uuid().optional(),
  avatar_url: z.string().url(),
});

type Schema = z.infer<typeof schema>;

export function PlayerForm({ onSuccess, kind, defaultValues }: FormProps<"PlayerModel">) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      discord_id:
        typeof defaultValues?.discord_id === "string" ? defaultValues.discord_id : undefined,
    },
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
      form.setValue("avatar_url", data.url);
      return data.url;
    } catch (error) {
      console.error("Upload failed:", error);
      form.setError("avatar_url", {
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
    const resp =
      kind === "create"
        ? await apiClient.POST("/admin/player", {
            body: values,
          })
        : await apiClient.PUT("/admin/player/{id}", {
            body: values,
            params: {
              path: {
                id: defaultValues.id,
              },
            },
          });

    if (resp.error) {
      toast.error(`Could not ${kind} player`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [teamIds, setTeamIds] = useState<components["schemas"]["TeamIds"][]>([]);
  const [banIds, setBanIds] = useState<components["schemas"]["BanIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/team/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setTeamIds(res.data);
      }
    });

    apiClient.GET("/admin/ban/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setBanIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="avatar_url"
          render={() => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
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
          name="discord_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discord Id</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Id</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between flex",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value : "Select team"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No team found.</CommandEmpty>
                      <CommandGroup>
                        {teamIds.map((teamId) => (
                          <CommandItem
                            value={teamId.id}
                            key={teamId.id}
                            onSelect={() => {
                              form.setValue("team_id", teamId.id);
                            }}
                          >
                            {teamId.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                teamId.id === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ban_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ban Id</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between flex",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value : "Select ban"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search ban..." />
                    <CommandList>
                      <CommandEmpty>No ban found.</CommandEmpty>
                      <CommandGroup>
                        {banIds.map((banId) => (
                          <CommandItem
                            value={banId.id}
                            key={banId.id}
                            onSelect={() => {
                              form.setValue("ban_id", banId.id);
                            }}
                          >
                            {banId.reason}
                            <Check
                              className={cn(
                                "ml-auto",
                                banId.id === field.value ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}
