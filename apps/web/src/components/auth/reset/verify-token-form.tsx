import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";

import { useResetStore } from "@/stores/reset";
import { useForm } from "react-hook-form";
import { z } from "zod";

const verifyEmailSchema = z.object({
  token: z.string().length(8),
});

export function VerifyTokenForm({ prev, next }: { prev: () => void; next: () => void }) {
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
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Enter Token</CardTitle>
        <CardDescription>Enter the reset token sent</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Token</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={8} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                    </InputOTP>
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
      </CardContent>
    </Card>
  );
}
