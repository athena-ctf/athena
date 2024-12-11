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
import { cn } from "@repo/ui/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  container_id: z.string(),
  container_name: z.string(),
  port_mapping: z.array(z.object({ hostPort: z.string(), destPort: z.string() })),
  deployment_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export function InstanceForm({
  onSuccess,
}: { onSuccess: (model: components["schemas"]["InstanceModel"]) => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      port_mapping: [{ hostPort: "", destPort: "" }],
    },
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/instance", {
      body: {
        ...values,
        port_mapping: Object.entries(values.port_mapping).map(([host, dest]) => `${host}:${dest}`),
      }, // TODO: check port mapping order
    });

    if (resp.error) {
      toast.error("Could not create instance");
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };
  const [deploymentIds, setDeploymentIds] = useState<components["schemas"]["DeploymentIds"][]>([]);

  const { fields, append, remove } = useFieldArray({
    name: "port_mapping",
    control: form.control,
  });

  useEffect(() => {
    apiClient.GET("/admin/deployment/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setDeploymentIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="container_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="container_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in days)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deployment_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deployment Id</FormLabel>
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
                      {field.value ? field.value : "Select deployment"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-flex p-0">
                  <Command>
                    <CommandInput placeholder="Search deployment..." />
                    <CommandList>
                      <CommandEmpty>No deployment found.</CommandEmpty>
                      <CommandGroup>
                        {deploymentIds.map((deploymentId) => (
                          <CommandItem
                            value={deploymentId.id}
                            key={deploymentId.id}
                            onSelect={() => {
                              form.setValue("deployment_id", deploymentId.id);
                            }}
                          >
                            {deploymentId.id}
                            <Check
                              className={cn(
                                "ml-auto",
                                deploymentId.id === field.value ? "opacity-100" : "opacity-0",
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
        <div>
          <h3 className="text-lg font-semibold mb-4">Port Mapping</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end space-x-4 mb-4">
              <FormField
                control={form.control}
                name={`port_mapping.${index}.hostPort`}
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
                name={`port_mapping.${index}.destPort`}
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
            onClick={() => append({ hostPort: "", destPort: "" })}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Port Mapping
          </Button>
        </div>

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
