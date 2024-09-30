import { client } from "@repo/api";
import { ScrollArea } from "@repo/ui/scroll-area";
import { UserProfileCard } from "@/components/user/profile-card";
import { UserScoreChart } from "@/components/user/score-chart";
import { UserSolvedChallenge } from "@/components/user/solved-challenge";
import { cookies } from "next/headers";
import { UserChallengeDiff } from "@/components/user/challenge-diff";

async function getUserFromUsername(username: string) {
  const { data, error } = await client.GET("/player/{username}/profile", {
    params: {
      path: {
        username,
      },
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    console.error(error.message);
  }

  return data;
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const userData = await getUserFromUsername(username);

  if (!userData) {
    return <>Could not fetch user</>;
  }

  return (
    <div className="grid h-[90vh] grid-cols-[25%_auto_auto] grid-rows-2 gap-4 pt-1">
      <div className="col-span-1 row-span-2">
        <UserProfileCard player={userData.player} user={userData.user} />
      </div>
      <div className="col-span-1 row-span-1">
        <UserScoreChart
          data={[
            {
              date: "12-2-2024",
              score: 2,
            },
            {
              date: "14-2-2024",
              score: 5,
            },
            {
              date: "18-2-2024",
              score: 3,
            },
          ]}
        />
      </div>
      <div className="col-span-1 row-span-1">
        <UserChallengeDiff data={userData.tag_solves} />
      </div>
      <div className="col-span-2 row-span-1">
        <ScrollArea className="h-[90%]">
          <UserSolvedChallenge challenge={userData.solved_challenges} />
        </ScrollArea>
      </div>
    </div>
  );
}
