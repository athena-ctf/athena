import { type components, fetchClient } from "@repo/api";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile/$username")({
  component: Index,
});

function Index() {
  const { username } = Route.useParams();

  const [profile, setProfile] = useState<components["schemas"]["PlayerProfile"]>();

  useEffect(() => {
    fetchClient
      .GET("/player/{username}/profile", { params: { path: { username } } })
      .then((resp) => {
        if (resp.error) {
          toast.error(resp.error.message);
        } else {
          setProfile(resp.data);
        }
      });
  }, [username]);

  return <></>;
}
