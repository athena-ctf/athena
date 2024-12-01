import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scoreboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/scoreboard"!</div>;
}
