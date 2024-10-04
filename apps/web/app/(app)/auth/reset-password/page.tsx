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
import Link from "next/link";

export default function Page() {
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your details below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullname">Email</Label>
            <Input id="fullname" required />
          </div>
          <Button type="submit" className="w-full">
            Reset
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Remembered your password?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
