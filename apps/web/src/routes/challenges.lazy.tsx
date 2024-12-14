import { createLazyFileRoute } from "@tanstack/react-router";

import { ChallengeCard } from "@/components/challenge/card";
import { Filter } from "@/components/challenge/filter";
import { ChallengeSearch } from "@/components/challenge/search";
import { apiClient } from "@/utils/api-client";
import type { components } from "@repo/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/challenges")({
  component: Index,
});

function Index() {
  const [challenges, setChallenges] = useState<components["schemas"]["ChallengeSummary"][]>([]);
  const [tags, setTags] = useState<components["schemas"]["TagModel"][]>([]);

  const [filtered, setFiltered] = useState<components["schemas"]["ChallengeSummary"][]>([]);
  const [results, setResults] = useState<components["schemas"]["ChallengeSummary"][]>([]);

  useEffect(() => {
    apiClient.GET("/player/challenges").then((resp) => {
      if (resp.error) {
        toast.error("Could not fetch challenges");
      } else {
        setChallenges(resp.data.summaries);
        setTags(resp.data.tags);
      }
    });
  }, []);

  return (
    <div className="m-2">
      <div className="mr-4 flex justify-between">
        <Filter
          tags={tags}
          onChange={(tags, difficulties, statuses) => {
            setFiltered(
              challenges.filter((challenge) => {
                const hasMatchingTag = tags.some((tag) =>
                  challenge.tags.some((newTag) => newTag.value === tag),
                );
                const hasMatchingDifficulty = difficulties.some(
                  (difficulty) => challenge.challenge.level.toString() === difficulty,
                );
                const hasMatchingStatus = statuses.some((status) => challenge.state === status);

                return hasMatchingTag || hasMatchingDifficulty || hasMatchingStatus;
              }),
            );
          }}
        />
        <ChallengeSearch challenges={filtered} onChange={(results) => setResults(results)} />
      </div>
      <div className="py-5">
        {results?.map((challengeSummary) => (
          <ChallengeCard challengeSummary={challengeSummary} key={challengeSummary.challenge.id} />
        ))}
      </div>
    </div>
  );
}
