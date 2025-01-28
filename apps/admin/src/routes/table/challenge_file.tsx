import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/challenge_file")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ChallengeFileTable />;
}
