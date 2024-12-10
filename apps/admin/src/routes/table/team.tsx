import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/team")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/team"!</div>;
}
