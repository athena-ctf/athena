import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useIsMobile } from "@ui/hooks/use-mobile";
import { Search } from "lucide-react";

export function MainChallengesSearch() {
  useIsMobile;
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
