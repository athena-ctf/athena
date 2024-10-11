import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scoreboard/player")({
  component: Index,
});

function Index() {
  return <></>;
}
