import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/docker/networks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/docker/network"!</div>;
}
