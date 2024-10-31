import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useResetStore } from "@/stores/reset";

const verifyEmailSchema = z.object({
  token: z.string().length(8),
});

export function VerifyTokenForm({
  prev,
  next,
}: { prev: () => void; next: () => void }) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const { setToken } = useResetStore();

  function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
    setToken(values.token);
    next();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Token</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row w-full space-x-4">
          <Button onClick={prev}>Back</Button>
          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </Form>
  );
}
