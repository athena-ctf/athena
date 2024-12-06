import { ChallengeDiff } from "@/components/profile/challenge-diff";
import { ProfileCard } from "@/components/profile/card";
import { ScoreChart } from "@/components/profile/score-chart";
import { SolvedChallenge } from "@/components/profile/solved-challenge";
import { apiClient } from "@/utils/api-client";
import type { components } from "@repo/api";
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
    apiClient.GET("/player/{username}/profile", { params: { path: { username } } }).then((resp) => {
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
          <ProfileCard
            name={profile.player.username}
            email={profile.player.email}
            awards={profile.awards}
            extra={{ kind: "player", avatarUrl: profile.player.avatar_url }}
            rank={profile.rank}
            score={profile.score}
            className="row-span-2"
          />
          <ScoreChart data={profile.history} />
          <ChallengeDiff data={profile.tag_solves} />
          <SolvedChallenge challenges={profile.solved_challenges} className="col-span-2" />
        </div>
      )}
    </div>
  );
}
