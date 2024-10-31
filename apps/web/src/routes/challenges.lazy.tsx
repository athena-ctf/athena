import { createLazyFileRoute } from "@tanstack/react-router";

import { ChallengeCard } from "@/components/challenge/card";
import {
  MainChallengesFilter,
  MobileChallengesFilter,
} from "@/components/challenge/filter";
import {
  MainChallengesSearch,
  MobileChallengesSearch,
} from "@/components/challenge/search";
import { fetchClient } from "@repo/api";

export const Route = createLazyFileRoute("/challenges")({
  component: Index,
});

function Index() {
  return (
    <div className="m-2">
      <div className="mr-4 flex justify-between md:hidden">
        <MobileChallengesSearch />
        <MobileChallengesFilter tag={tags} />
      </div>
      <div className="mr-4 hidden justify-between md:flex">
        <MainChallengesSearch />
        <div className="mx-2 md:flex">
          <MainChallengesFilter tag={tags} />
          <MainChallengesFilter tag={tags} />
        </div>
      </div>
      <div className="py-5">
        {data?.map((challengeSummary) => (
          <ChallengeCard
            challengeSummary={challengeSummary}
            key={challengeSummary.challenge.id}
          />
        ))}
      </div>
    </div>
  );
}
