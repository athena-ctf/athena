import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@repo/api";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { DateTimePicker } from "@repo/ui/components/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import { formatISO, parseISO } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const schema = z.object({
  title: z.string(),
  content: z.string(),
  player_id: z.string().uuid(),
  read_at: z.date().optional(),
});

type Schema = z.infer<typeof schema>;

export function NotificationForm({
  onSuccess,
  kind,
  defaultValues,
}: FormProps<"NotificationModel">) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
      read_at:
        typeof defaultValues?.read_at === "string" ? parseISO(defaultValues.read_at) : undefined,
    },
  });

  const onSubmit = async (values: Schema) => {
    const resp =
      kind === "create"
        ? await apiClient.POST("/admin/notification", {
            body: { ...values, read_at: values.read_at && formatISO(values.read_at) },
          })
        : await apiClient.PUT("/admin/notification/{id}", {
            body: { ...values, read_at: values.read_at && formatISO(values.read_at) },
            params: {
              path: {
                id: defaultValues.id,
              },
            },
          });

    if (resp.error) {
      toast.error(`Could not ${kind} notification`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };
  const [playerIds, setPlayerIds] = useState<components["schemas"]["PlayerIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/player/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setPlayerIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content of the notificaton"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="player_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player Id</FormLabel>
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
                      {field.value ? field.value : "Select player"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search player..." />
                    <CommandList>
                      <CommandEmpty>No player found.</CommandEmpty>
                      <CommandGroup>
                        {playerIds.map((playerId) => (
                          <CommandItem
                            value={playerId.id}
                            key={playerId.id}
                            onSelect={() => {
                              form.setValue("player_id", playerId.id);
                            }}
                          >
                            {playerId.username}
                            <Check
                              className={cn(
                                "ml-auto",
                                playerId.id === field.value ? "opacity-100" : "opacity-0",
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
          name="read_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="datetime">Read At</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}
