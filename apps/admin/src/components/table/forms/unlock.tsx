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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const createSchema = z.object({
  player_id: z.string().uuid(),
  hint_id: z.string().uuid(),
});

type CreateSchema = z.infer<typeof createSchema>;

export function CreateUnlockForm({ onSuccess, kind }: FormProps<"UnlockModel", "join_create">) {
  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: CreateSchema) => {
    const resp = await apiClient.POST("/admin/unlock", {
      body: values,
    });

    if (resp.error) {
      toast.error(`Could not ${kind} unlock`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [playerIds, setPlayerIds] = useState<components["schemas"]["PlayerIds"][]>([]);
  const [hintIds, setHintIds] = useState<components["schemas"]["HintIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/player/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setPlayerIds(res.data);
      }
    });

    apiClient.GET("/admin/hint/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setHintIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
          name="hint_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hint Id</FormLabel>
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
                      {field.value ? field.value : "Select hint"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search hint..." />
                    <CommandList>
                      <CommandEmpty>No hint found.</CommandEmpty>
                      <CommandGroup>
                        {hintIds.map((hintId) => (
                          <CommandItem
                            value={hintId.id}
                            key={hintId.id}
                            onSelect={() => {
                              form.setValue("hint_id", hintId.id);
                            }}
                          >
                            {hintId.description}
                            <Check
                              className={cn(
                                "ml-auto",
                                hintId.id === field.value ? "opacity-100" : "opacity-0",
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
