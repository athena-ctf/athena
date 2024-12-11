import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";
import type { components } from "@repo/api";

const schema = z.object({
  reason: z.string(),
  duration: z.number(),
});

type Schema = z.infer<typeof schema>;

export function BanForm({
  onSuccess,
}: { onSuccess: (model: components["schemas"]["BanModel"]) => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/ban", {
      body: values,
    });

    if (resp.error) {
      toast.error("Could not create ban");
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
          name="reason"
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
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in days)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
