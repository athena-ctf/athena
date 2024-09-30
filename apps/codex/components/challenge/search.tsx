import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export function MainChallengesSearch() {
  return (
    <div className="flex w-[40%]">
      <Input className="" placeholder="Search Challenges here" />
      <Button>
        <Search />
      </Button>
    </div>
  );
}
export function MobileChallengesSearch() {
  return (
    <div className="flex w-auto">
      <Input className="" placeholder="Search Challenges here" />
      <Button>
        <Search />
      </Button>
    </div>
  );
}
