import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { defineStepper } from "@stepperize/react";
import { DetailsForm } from "@/components/auth/register/details-form";
import { VerifyTokenForm } from "@/components/auth/register/verify-token-form";
import { ChooseTeamForm } from "@/components/auth/register/team-choice-form";

export const Route = createFileRoute("/auth/register")({
  component: Index,
});

const { useStepper } = defineStepper(
  {
    id: "Step 1",
    title: "Details",
    description: "Enter your details below to register to your account",
  },
  {
    id: "Step 2",
    title: "Choose Team",
    description: "Enter your team name and invite id to join",
  },
  {
    id: "Step 3",
    title: "Verify Account",
    description: "Enter the verification token sent to your email",
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
              <DetailsForm next={() => stepper.next()} />
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
              <ChooseTeamForm next={() => stepper.next()} prev={() => stepper.prev()} />
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
              <VerifyTokenForm prev={() => stepper.prev()} />
            </CardContent>
          </>
        ),
      })}
    </Card>
  );
}
