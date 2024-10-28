import type { components } from "@repo/api";
import { ChallengeModal } from "./modal";
import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Circle } from "lucide-react";

const difficulty = {
  easy: "fill-green-400 text-green-400",
  medium: "fill-yellow-300 text-yellow-300",
  hard: "fill-red-500 text-red-500",
  extreme: " fill-purple-900 text-purple-900",
};

export function ChallengeCard({
  challengeSummary,
}: {
  challengeSummary: components["schemas"]["ChallengeSummary"];
}) {
  return (
    <div className="mx-[7%] my-2 cursor-pointer">
      <ChallengeModal challengeSummary={challengeSummary}>
        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex place-content-center justify-between">
              <div className="flex place-items-center space-x-4">
                <Circle
                  className={difficulty[challengeSummary.challenge.difficulty]}
                />
                <CardTitle className="flex flex-col items-center text-xl">
                  {challengeSummary.challenge.title}
                </CardTitle>
                <CardDescription className="flex flex-col items-center">
                  @{challengeSummary.challenge.author_name}
                </CardDescription>
              </div>
              <div className="flex flex-row space-x-2 py-3">
                {challengeSummary.tags.map((tag) => (
                  <Badge className="h-7" key={tag.value}>
                    {tag.value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-10">
            <div className="flex justify-between text-ellipsis p-2 px-6 text-sm">
              <div>{challengeSummary.challenge.description}</div>
            </div>
          </CardContent>
        </Card>
      </ChallengeModal>
    </div>
  );
}
