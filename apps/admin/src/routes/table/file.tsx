import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/file")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/file"!</div>;
}
