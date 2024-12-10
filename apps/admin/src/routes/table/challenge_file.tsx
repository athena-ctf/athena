import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/challenge_file")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/challenge_file"!</div>;
}
