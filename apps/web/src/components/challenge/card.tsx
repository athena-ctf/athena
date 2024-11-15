import type { components } from "@repo/api";
import { ChallengeModal } from "./modal";
import { Badge } from "@repo/ui/components/badge";
import { CountdownTimer } from "@repo/ui/components/countdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Circle } from "lucide-react";
import { useCtfStore } from "@/stores/ctf";
import { parseISO } from "date-fns";

const stateColor = {
  solved: "",
  unsolved: "",
  challenge_limit_reached: "",
} as const;

export function ChallengeCard({
  challengeSummary,
}: {
  challengeSummary: components["schemas"]["ChallengeSummary"];
}) {
  const ctf = useCtfStore();

  return (
    <div className="mx-[7%] my-2 cursor-pointer">
      <ChallengeModal challengeSummary={challengeSummary}>
        <Card className={`shadow-2xl ${stateColor[challengeSummary.state]}`}>
          <CardHeader>
            <div className="flex place-content-center justify-between">
              <div className="flex place-items-center space-x-4">
                <Circle
                  style={{
                    color: ctf.level_map[challengeSummary.challenge.level.toString()].color,
                  }}
                />
                <CardTitle className="flex flex-row content-between text-xl w-full">
                  {challengeSummary.challenge.title}
                  {challengeSummary.deployment?.expires_at && (
                    <CountdownTimer targetDate={parseISO(challengeSummary.deployment.expires_at)} />
                  )}
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
