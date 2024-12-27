import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker/images")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/docker/images"!</div>;
}
