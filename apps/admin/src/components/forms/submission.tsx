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
import { Switch } from "@ui/components/ui/switch";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const createSchema = z.object({
  player_id: z.string().uuid(),
  challenge_id: z.string().uuid(),
  is_correct: z.boolean(),
  flags: z.array(z.object({ value: z.string() })),
});

const updateSchema = z.object({
  is_correct: z.boolean(),
  flags: z.array(z.object({ value: z.string() })),
});

type CreateSchema = z.infer<typeof createSchema>;
type UpdateSchema = z.infer<typeof updateSchema>;

export function CreateSubmissionForm({
  onSuccess,
  kind,
}: FormProps<"SubmissionModel", "join_create">) {
  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
    defaultValues: {
      flags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "flags",
    control: form.control,
  });

  const onSubmit = async (values: CreateSchema) => {
    const resp = await apiClient.POST("/admin/submission", {
      body: { ...values, flags: values.flags.map((flag) => flag.value) },
    });

    if (resp.error) {
      toast.error(`Could not ${kind} submission`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [playerIds, setPlayerIds] = useState<components["schemas"]["PlayerIds"][]>([]);
  const [challengeIds, setChallengeIds] = useState<components["schemas"]["ChallengeIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/player/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setPlayerIds(res.data);
      }
    });

    apiClient.GET("/admin/challenge/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setChallengeIds(res.data);
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
          name="challenge_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Id</FormLabel>
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
                      {field.value ? field.value : "Select challenge"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search challenge..." />
                    <CommandList>
                      <CommandEmpty>No challenge found.</CommandEmpty>
                      <CommandGroup>
                        {challengeIds.map((challengeId) => (
                          <CommandItem
                            value={challengeId.id}
                            key={challengeId.id}
                            onSelect={() => {
                              form.setValue("challenge_id", challengeId.id);
                            }}
                          >
                            {challengeId.title}
                            <Check
                              className={cn(
                                "ml-auto",
                                challengeId.id === field.value ? "opacity-100" : "opacity-0",
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
          name="is_correct"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <FormLabel>Is Correct</FormLabel>
              <FormControl>
                <Switch className="!mt-0" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-4 mb-2">
              <FormField
                control={form.control}
                name={`flags.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    {index === 0 && <FormLabel>Flags</FormLabel>}
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 0 && (
                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Flag
          </Button>
        </div>
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}

export function UpdateSubmissionForm({
  onSuccess,
  kind,
  oldModel,
}: FormProps<"SubmissionModel", "join_update">) {
  const form = useForm<UpdateSchema>({
    resolver: zodResolver(updateSchema),
    mode: "onChange",
    defaultValues: {
      is_correct: oldModel.is_correct,
      flags: oldModel.flags.map((flag) => ({ value: flag })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "flags",
    control: form.control,
  });

  const onSubmit = async (values: UpdateSchema) => {
    const resp = await apiClient.PUT("/admin/submission/{challenge_id}-{player_id}", {
      params: {
        path: {
          player_id: oldModel.player_id,
          challenge_id: oldModel.challenge_id,
        },
      },
      body: { ...values, flags: values.flags.map((flag) => flag.value) },
    });

    if (resp.error) {
      toast.error(`Could not ${kind} submission`);
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
          name="is_correct"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <FormLabel>Is Correct</FormLabel>
              <FormControl>
                <Switch className="!mt-0" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-4 mb-2">
              <FormField
                control={form.control}
                name={`flags.${index}.value`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    {index === 0 && <FormLabel>Flags</FormLabel>}
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.length > 0 && (
                <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Flag
          </Button>
        </div>
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}
