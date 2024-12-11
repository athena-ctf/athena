import { DetailsForm } from "@/components/auth/register/details-form";
import { TeamChoiceForm } from "@/components/auth/register/team-choice-form";
import { VerifyTokenForm } from "@/components/auth/register/verify-token-form";
import { defineStepper } from "@stepperize/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: Index,
});

const { useStepper } = defineStepper({ id: "1" }, { id: "2" }, { id: "3" });

export default function Index() {
  const stepper = useStepper();

  return stepper.switch({
    "1": () => <DetailsForm next={() => stepper.next()} />,
    "2": () => <TeamChoiceForm next={() => stepper.next()} prev={() => stepper.prev()} />,
    "3": () => <VerifyTokenForm prev={() => stepper.prev()} />,
  });
}
