import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/container")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/container"!</div>;
}
