"use client";

import { register } from "@/lib/actions";
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
import { registerSchema } from "@repo/ui/schemas";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export default function Page() {
  const router = useRouter();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    register(values).then((res) => {
      toast.success("Successfully registered");
      router.push("/auth/login");
    });
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details below to register to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
            <Button type="submit" className="w-full">
              Register
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/register" className="underline">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
