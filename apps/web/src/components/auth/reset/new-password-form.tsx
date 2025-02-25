import { useResetStore } from "@/stores/reset";
import { apiClient } from "@/utils/api-client";
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
import { PasswordInput } from "@repo/ui/components/password-input";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "The passwords did not match",
    path: ["confirmPassword"],
  });

export function NewPasswordForm({
  prev,
}: {
  prev: () => void;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const { token, email } = useResetStore();
  const navigate = useNavigate();

  const onFormSubmit = async (values: z.infer<typeof schema>) => {
    const resp = await apiClient.POST("/auth/player/reset-password", {
      body: {
        email,
        token,
        new_password: values.password,
      },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      toast.success("Successfully reset password");
      navigate({ to: "/auth/login", search: { next: "/" } });
    }
  };

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Enter New Password</CardTitle>
        <CardDescription>Enter the new credentials</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row w-full space-x-4">
              <Button onClick={prev}>Back</Button>
              <Button type="submit">Reset Password</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
