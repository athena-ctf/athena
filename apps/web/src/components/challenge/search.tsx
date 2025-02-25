import type { components } from "@repo/api";
import { Input } from "@repo/ui/components/input";
import Fuse from "fuse.js";
import { useMemo } from "react";

interface FuzzySearchInputProps {
  challenges: components["schemas"]["ChallengeSummary"][];
  onChange: (results: components["schemas"]["ChallengeSummary"][]) => void;
}

export function ChallengeSearch({ challenges, onChange }: FuzzySearchInputProps) {
  const fuse = useMemo(
    () =>
      new Fuse(challenges, {
        keys: [
          { name: "challenge.title", weight: 0.7 },
          { name: "challenge.description", weight: 0.3 },
        ],
        threshold: 0.4,
        includeScore: true,
      }),
    [challenges],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const results = !value.trim() ? challenges : fuse.search(value).map((result) => result.item);
    onChange(results);
  };

  return <Input onChange={handleSearch} placeholder="Search..." />;
}
