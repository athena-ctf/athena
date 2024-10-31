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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(({ confirmPassword, password }) => confirmPassword !== password, {
    message: "The passwords did not match",
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
    const resp = await fetchClient.POST("/auth/player/reset-password", {
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showPassword ? "text" : "password"} />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                    {showPassword ? (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
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
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                    {showConfirmPassword ? (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>
                </div>
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
  );
}
