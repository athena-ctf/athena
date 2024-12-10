import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/challenge")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/challenge"!</div>;
}
