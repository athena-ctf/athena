import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/button";
import { TagsInput } from "@repo/ui/components/tags-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Switch } from "@repo/ui/components/switch";
import { PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

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

export function ContainerForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      environment: [{ key: "", value: "" }],
    },
  });

  const [challengeIds, setChallengeIds] = useState<string[]>([]);

  const { fields, append, remove } = useFieldArray({
    name: "environment",
    control: form.control,
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/container", {
      body: {
        ...values,
        environment: Object.entries(values.environment).map(([k, v]) => `${k}=${v}`),
        command: values.command.split(" "),
      },
    });
  };

  useEffect(() => {
    apiClient.GET("/admin/challenge");
  }, []);

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create Container</CardTitle>
        <CardDescription>Create a new container</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                  <FormLabel className="text-base">Internal</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
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
              <h3 className="text-lg font-semibold mb-4">Environment</h3>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-4 mb-4">
                  <FormField
                    control={form.control}
                    name={`environment.${index}.key`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key</FormLabel>
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
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => remove(index)}
                    >
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
                    placeholder="Enter dependecies"
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
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
