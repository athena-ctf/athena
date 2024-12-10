import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/player")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/player"!</div>;
}
