"use client";

import { login } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { loginSchema } from "@repo/ui/schemas";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function Page({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login(values).then((res) => {
      toast.success("Logged in successfully.");
      if (searchParams.next) {
        router.push(searchParams.next);
      } else {
        router.push("/");
      }
    });
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
                      href="/auth/reset-password"
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
              <Link href="/auth/register" className="underline">
                Register
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
