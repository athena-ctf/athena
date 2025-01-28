import { ChallengeTable } from "@/components/tables/challenge";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/challenge")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChallengeTable />;
}
