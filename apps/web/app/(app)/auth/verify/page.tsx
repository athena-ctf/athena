"use client";

import { verify } from "@/lib/actions";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@repo/ui/input-otp";
import { verifySchema } from "@repo/ui/schemas";
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
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    mode: "onSubmit",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  function onSubmit(values: z.infer<typeof verifySchema>) {
    verify(values.otp).then((res) => {
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
        <CardTitle className="text-2xl">Verify</CardTitle>
        <CardDescription>
          Enter your code to verify your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={8} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSeparator />
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
            <Button type="submit" className="w-full">
              Verify
            </Button>
            <div className="mt-4 text-center text-sm">
              Did&apos;nt receive code?{" "}
              <Link href="/auth/register" className="underline">
                Resend Code
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
