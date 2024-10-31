import { fetchClient } from "@repo/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$username")({
  component: Index,
});

function Index() {
  const { username } = Route.useParams();
  return <></>;
}
