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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "@/stores/register";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@ui/components/ui/input-otp";
import { apiClient } from "@/utils/api-client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@ui/components/ui/card";

const verifyEmailSchema = z.object({
  token: z.string().length(8),
});

export function VerifyTokenForm({ prev }: { prev: () => void }) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const store = useRegisterStore();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
    const resp = await apiClient.POST("/auth/player/register", {
      body: {
        avatar_url: store.avatarUrl,
        display_name: store.displayName,
        email: store.email,
        password: store.password,
        username: store.username,
        team: store.team,
        token: values.token,
      },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      toast.success("Successfully registered");
      navigate({ to: "/auth/login", search: { next: "/" } });
    }
  };

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Verify Account</CardTitle>
        <CardDescription>Enter the verification token sent to your email</CardDescription>
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
