import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/notification")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/notification"!</div>;
}
