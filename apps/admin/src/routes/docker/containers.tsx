import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker/containers")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/docker/containers"!</div>;
}
