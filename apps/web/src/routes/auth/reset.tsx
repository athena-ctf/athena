import { createFileRoute } from "@tanstack/react-router";
import { defineStepper } from "@stepperize/react";
import { EmailForm } from "@/components/auth/reset/email-form";
import { VerifyTokenForm } from "@/components/auth/reset/verify-token-form";
import { NewPasswordForm } from "@/components/auth/reset/new-password-form";

export const Route = createFileRoute("/auth/reset")({
  component: Index,
});

const { useStepper } = defineStepper(
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
);

export default function Index() {
  const stepper = useStepper();

  return stepper.switch({
    "1": () => <EmailForm next={() => stepper.next()} />,
    "2": () => <VerifyTokenForm next={() => stepper.next()} prev={() => stepper.prev()} />,
    "3": () => <NewPasswordForm prev={() => stepper.prev()} />,
  });
}
