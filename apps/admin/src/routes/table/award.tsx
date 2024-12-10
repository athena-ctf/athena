import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/award")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/award"!</div>;
}
