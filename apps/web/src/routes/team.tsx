import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team")({
  component: Index,
});

function Index() {
  return <></>;
}
