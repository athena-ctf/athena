import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/invite")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/invite"!</div>;
}
