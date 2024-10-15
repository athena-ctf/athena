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
import { useRegisterStore } from "../../stores/register";

const verifyEmailSchema = z.object({
  code: z.string().length(8),
});

export function VerifyCodeForm({ prev }: { prev: () => void }) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const { setCode } = useRegisterStore();

  function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
    setCode(values.code);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
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
