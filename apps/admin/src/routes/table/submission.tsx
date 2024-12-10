import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/submission")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/submission"!</div>;
}
