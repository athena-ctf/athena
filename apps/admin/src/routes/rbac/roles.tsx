import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rbac/roles")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/rbac/roles"!</div>;
}
