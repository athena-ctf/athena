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
import { Switch } from "@repo/ui/components/switch";
import { TagsInput } from "@repo/ui/components/tags-input";
import { cn } from "@repo/ui/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const schema = z.object({
  challenge_id: z.string().uuid(),
  name: z.string(),
  image: z.string(),
  internal: z.boolean(),
  memory_limit: z.number(),
  command: z.string(),
  environment: z.array(z.object({ key: z.string(), value: z.string() })),
  ports: z.array(z.number()),
  networks: z.array(z.string()),
  depends_on: z.array(z.string()),
});

type Schema = z.infer<typeof schema>;

export function ContainerForm({
  onSuccess,
  kind,
  defaultValues: _defaultValues,
}: FormProps<"ContainerModel">) {
  const defaultValues = _defaultValues && {
    ..._defaultValues,
    environment: _defaultValues.environment.map((env) => ({
      key: env.split("=")[0],
      value: env.split("=")[1],
    })),
  };

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { environment: [], ports: [], networks: [], depends_on: [], ...defaultValues },
  });

  const [challengeIds, setChallengeIds] = useState<components["schemas"]["ChallengeIdSchema"][]>(
    [],
  );

  const { fields, append, remove } = useFieldArray({
    name: "environment",
    control: form.control,
  });

  const onSubmit = async (values: Schema) => {
    const resp =
      kind === "create"
        ? await apiClient.POST("/admin/container", {
            body: {
              ...values,
              environment: Object.entries(values.environment).map(([k, v]) => `${k}=${v}`),
            },
          })
        : await apiClient.PUT("/admin/container/{id}", {
            body: {
              ...values,
              environment: Object.entries(values.environment).map(([k, v]) => `${k}=${v}`),
            },
            params: {
              path: {
                id: _defaultValues.id,
              },
            },
          });

    if (resp.error) {
      toast.error(`Could not ${kind} container`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  useEffect(() => {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="internal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <FormLabel>Internal</FormLabel>
              <FormControl>
                <Switch className="!mt-0" checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="memory_limit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Memory Limit (in mB)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="command"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Command</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <p>Environment</p>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-4 mb-2">
              <FormField
                control={form.control}
                name={`environment.${index}.key`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Key</FormLabel>}
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`environment.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    {index === 0 && <FormLabel>Value</FormLabel>}
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
            onClick={() => append({ key: "", value: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Environment
          </Button>
        </div>
        <FormField
          control={form.control}
          name="networks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Networks</FormLabel>
              <TagsInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Enter networks"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="depends_on"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dependencies</FormLabel>
              <TagsInput
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Enter dependencies"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ports"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ports</FormLabel>
              <TagsInput
                value={field.value.map((value) => value.toString())}
                onValueChange={(values) =>
                  field.onChange(values.map((value) => Number.parseInt(value)))
                }
                placeholder="Enter ports"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}
