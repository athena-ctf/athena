import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table/challenge_tag")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/table/challenge_tag"!</div>;
}
