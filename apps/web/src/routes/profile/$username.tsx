import { ChallengeDiff } from "@/components/profile/challenge-diff";
import { PlayerProfileCard } from "@/components/profile/profile-card";
import { ScoreChart } from "@/components/profile/score-chart";
import { SolvedChallenge } from "@/components/profile/solved-challenge";
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

  return (
    <div className="h-full w-screen">
      {profile && (
        <div className="grid grid-rows-2 grid-cols-3">
          <PlayerProfileCard playerProfile={profile} className="row-span-2" />
          <ScoreChart data={profile.history} />
          <ChallengeDiff data={profile.tag_solves} />
          <SolvedChallenge challenge={profile.solved_challenges} className="col-span-2" />
        </div>
      )}
    </div>
  );
}
