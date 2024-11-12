import { useMemo } from "react";
import Fuse from "fuse.js";
import { Input } from "@repo/ui/components/input";
import type { components } from "@repo/api";

interface FuzzySearchInputProps {
  challenges: components["schemas"]["ChallengeSummary"][];
  onChange: (results: components["schemas"]["ChallengeSummary"][]) => void;
  placeholder?: string;
}

export function ChallengeSearch({
  challenges,
  onChange,
  placeholder = "Search...",
}: FuzzySearchInputProps) {
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

  return <Input onChange={handleSearch} placeholder={placeholder} />;
}
