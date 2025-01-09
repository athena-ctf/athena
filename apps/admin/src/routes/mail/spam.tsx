import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mail/spam")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/mail/spam"!</div>;
}
