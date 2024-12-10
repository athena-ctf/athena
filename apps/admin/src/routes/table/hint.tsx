import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/hint")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/hint"!</div>;
}
