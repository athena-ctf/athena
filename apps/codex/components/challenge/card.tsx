import type { components } from "@repo/api";
import { ChallengeModal } from "@/components/challenge/modal";
import { Badge } from "@ui/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Circle } from "lucide-react";
import React from "react";

const difficulty = {
  easy: "fill-green-400 text-green-400",
  medium: "fill-yellow-300 text-yellow-300",
  hard: "fill-red-500 text-red-500",
  extreme: " fill-purple-900 text-purple-900",
};

export function ChallengeCard({
  relations: { challenge, tags, files, hints },
}: {
  relations: components["schemas"]["ChallengeRelations"];
}) {
  return (
    <div className="mx-[10%] my-2 cursor-pointer">
      <ChallengeModal
        files={files}
        hints={hints}
        challenge={challenge}
        tags={tags}
        solves={30}
      >
        <Card className="shadow-2xl">
          <CardHeader>
            <div className="flex place-content-center justify-between">
              <div className="flex place-items-center space-x-4">
                <Circle className={difficulty[challenge.difficulty]} />
                <CardTitle className="flex flex-col items-center text-xl">
                  {challenge.title}
                </CardTitle>
                <CardDescription className="flex flex-col items-center">
                  @{challenge.author_name}
                </CardDescription>
              </div>
              <div className="flex flex-row space-x-2 py-3">
                {tags.map((tag) => (
                  <Badge className="h-7" key={tag.id}>
                    {tag.value}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-10">
            <div className="flex justify-between text-ellipsis p-2 px-6 text-sm">
              <div>{challenge.description}</div>
            </div>
          </CardContent>
        </Card>
      </ChallengeModal>
    </div>
  );
}
