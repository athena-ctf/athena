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
import { PasswordInput } from "@repo/ui/components/password-input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAuthStore } from "@/stores/auth";
import { Loader2 } from "lucide-react";
import { apiClient } from "@/utils/api-client";

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
  const { setTokens } = useAuthStore.getState();

  const onSubmit = async (body: z.infer<typeof loginSchema>) => {
    const resp = await apiClient.POST("/auth/player/token", { body });

    if (resp.error) {
      toast.error("Could not login");
      console.error(resp.error.message);
    } else {
      setTokens(resp.data.access_token); // TODO: store player model also
      toast.success("Logged in successfully");
      navigate({ to: next });
    }
  };

  return (
    <Card className="m-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your username below to login to your account</CardDescription>
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
                    <Link to="/auth/reset" className="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {form.formState.isSubmitting && <Loader2 className="animate-spin" />} Login
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
