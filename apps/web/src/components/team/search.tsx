import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";

export function TeamSearch() {
  return (
    <div className="flex w-1/3">
      <Input className="" placeholder="Search Team here" />
      <Button>
        <Search />
      </Button>
    </div>
  );
}
