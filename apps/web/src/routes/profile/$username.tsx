import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$username")({
  component: Index,
});

function Index() {
  return <></>;
}
