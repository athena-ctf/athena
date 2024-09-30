"use client";

import { Alert, AlertTitle } from "@repo/ui/alert";
import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { CircleX, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page({
  searchParams: { token },
}: { searchParams: { token?: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      {token ? (
        <Card className="m-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              Enter new credentials to reset password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    required
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
              </div>
              <Button type="submit" className="w-full">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Alert variant="destructive" className="mx-auto my-6 w-11/12">
          <CircleX className="size-4" />
          <AlertTitle>No token Found</AlertTitle>
        </Alert>
      )}
    </>
  );
}
