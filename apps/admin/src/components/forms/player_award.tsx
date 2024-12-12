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
import { Input } from "@repo/ui/components/input";
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
  award_id: z.string().uuid(),
  count: z.number(),
});

const updateSchema = z.object({
  count: z.number(),
});

type CreateSchema = z.infer<typeof createSchema>;
type UpdateSchema = z.infer<typeof updateSchema>;

export function CreatePlayerAwardForm({
  onSuccess,
  kind,
}: FormProps<"PlayerAwardModel", "join_create">) {
  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: CreateSchema) => {
    const resp = await apiClient.POST("/admin/player_award", {
      body: values,
    });

    if (resp.error) {
      toast.error(`Could not ${kind} player award`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [playerIds, setPlayerIds] = useState<components["schemas"]["PlayerIds"][]>([]);
  const [awardIds, setAwardIds] = useState<components["schemas"]["AwardIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/player/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setPlayerIds(res.data);
      }
    });

    apiClient.GET("/admin/award/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setAwardIds(res.data);
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
          name="award_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Award Id</FormLabel>
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
                      {field.value ? field.value : "Select award"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search award..." />
                    <CommandList>
                      <CommandEmpty>No award found.</CommandEmpty>
                      <CommandGroup>
                        {awardIds.map((awardId) => (
                          <CommandItem
                            value={awardId.id}
                            key={awardId.id}
                            onSelect={() => {
                              form.setValue("award_id", awardId.id);
                            }}
                          >
                            {awardId.value}
                            <Check
                              className={cn(
                                "ml-auto",
                                awardId.id === field.value ? "opacity-100" : "opacity-0",
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
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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

export function UpdatePlayerAwardForm({
  onSuccess,
  kind,
  oldModel,
}: FormProps<"PlayerAwardModel", "join_update">) {
  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: {
      count: oldModel.count,
    },
  });

  const onSubmit = async (values: UpdateSchema) => {
    const resp = await apiClient.PUT("/admin/player_award/{player_id}-{award_id}", {
      params: {
        path: {
          player_id: oldModel.player_id,
          award_id: oldModel.award_id,
        },
      },
      body: values,
    });

    if (resp.error) {
      toast.error(`Could not ${kind} player award`);
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
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
