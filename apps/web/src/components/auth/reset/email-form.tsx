import { useResetStore } from "@/stores/reset";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchClient } from "@repo/api";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export function EmailForm({ next }: { next: () => void }) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { setEmail } = useResetStore();

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const resp = await fetchClient.POST("/auth/player/reset-password/send-token", {
      body: {
        email: values.email,
      },
    });
    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      setEmail(values.email);
      toast.info("Sent token to email");
      next();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
        <Button type="submit">Send Token</Button>
      </form>
    </Form>
  );
}
