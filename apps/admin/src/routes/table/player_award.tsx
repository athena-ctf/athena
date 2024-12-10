import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/player_award")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/player_award"!</div>;
}
