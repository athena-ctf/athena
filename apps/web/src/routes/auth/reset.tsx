import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { defineStepper } from "@stepperize/react";
import { EmailForm } from "@/components/auth/reset/email-form";
import { VerifyTokenForm } from "@/components/auth/register/verify-token-form";
import { NewPasswordForm } from "@/components/auth/reset/new-password";

export const Route = createFileRoute("/auth/reset")({
  component: Index,
});

const { useStepper } = defineStepper(
  {
    id: "Step 1",
    title: "Enter Email",
    description: "Enter the email of account to recover",
  },
  {
    id: "Step 2",
    title: "Enter Token",
    description: "Enter the reset token sent",
  },
  {
    id: "Step 3",
    title: "Enter new password",
    description: "Enter the new credentials",
  },
);

export default function Index() {
  const stepper = useStepper();

  return (
    <Card className="m-auto max-w-sm">
      {stepper.switch({
        "Step 1": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailForm next={() => stepper.next()} />
            </CardContent>
          </>
        ),
        "Step 2": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <VerifyTokenForm prev={() => stepper.prev()} />
            </CardContent>
          </>
        ),
        "Step 3": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <NewPasswordForm prev={() => stepper.prev()} />
            </CardContent>
          </>
        ),
      })}
    </Card>
  );
}
