import { apiQueryClient } from "@repo/api";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$username")({
  component: Index,
});

function Index() {
  const { username } = Route.useParams();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = apiQueryClient.useQuery(
    "get",
    "/player/{username}/profile",
    {
      params: {
        path: {
          username,
        },
      },
    },
    {},
    queryClient,
  );

  if (error) {
    // TODO
  }

  return <></>;
}
