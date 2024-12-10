import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/instance")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/instance"!</div>;
}
