import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
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
import { Input } from "@repo/ui/components/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { apiQueryClient } from "@repo/api";

const loginSearchSchema = z.object({
  next: z.string().url().catch(""),
});

export const Route = createFileRoute("/auth/login")({
  component: Index,
  validateSearch: loginSearchSchema,
});

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export default function Index() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const queryClient = useQueryClient();

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(body: z.infer<typeof loginSchema>) {
    const { data, error } = apiQueryClient.useQuery(
      "post",
      "/auth/player/login",
      {
        body,
      },
      {},
      queryClient,
    );

    if (data) {
      toast.success("Logged in successfully.");
      navigate({ to: next });
    } else {
      toast.error(error?.message);
    }
  }

  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/auth/reset"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
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
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/register" className="underline">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
