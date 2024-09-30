import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
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
