import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker/volumes")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/docker/volumes"!</div>;
}
