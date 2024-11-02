import { createLazyFileRoute } from "@tanstack/react-router";

import { ChallengeCard } from "@/components/challenge/card";
import {
  MainChallengesSearch,
  MobileChallengesSearch,
} from "@/components/challenge/search";
import { type components, fetchClient } from "@repo/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/challenges")({
  component: Index,
});

function Index() {
  const [challenges, setChallenges] = useState<
    components["schemas"]["ChallengeSummary"][]
  >([]); // TODO: add loading screen

  useEffect(() => {
    fetchClient.GET("/player/challenges").then((resp) => {
      if (resp.error) {
        toast.error("Could not fetch challenges");
      } else {
        setChallenges(resp.data);
      }
    });
  }, []);

  return (
    <div className="m-2">
      <div className="mr-4 flex justify-between md:hidden">
        <MobileChallengesSearch />
      </div>
      <div className="mr-4 hidden justify-between md:flex">
        <MainChallengesSearch />
      </div>
      <div className="py-5">
        {challenges?.map((challengeSummary) => (
          <ChallengeCard
            challengeSummary={challengeSummary}
            key={challengeSummary.challenge.id}
          />
        ))}
      </div>
    </div>
  );
}
