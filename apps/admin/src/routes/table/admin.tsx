import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/admin"!</div>;
}
