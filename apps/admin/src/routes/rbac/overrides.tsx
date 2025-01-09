import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rbac/overrides")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/rbac/overrides"!</div>;
}
