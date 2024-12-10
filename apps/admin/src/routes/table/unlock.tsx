import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/unlock")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/unlock"!</div>;
}
