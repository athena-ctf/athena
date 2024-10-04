import { client } from "@repo/api";
import { ScrollArea } from "@repo/ui/scroll-area";
import { TeamProfileCard } from "@/components/team/profile-card";
import { TeamScoreChart } from "@/components/team/score-chart";
import { TeamSolvedChallenge } from "@/components/team/solved-challenge";
import { cookies } from "next/headers";
import { TeamChallengeDiff } from "@/components/team/challenge-diff";

async function getTeamFromName(teamname: string) {
  const { data, error } = await client.GET("{teamname}/profile", {
    params: {
      path: {
        teamname,
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
  params: { teamname },
}: {
  params: { teamname: string };
}) {
  const teamData = await getTeamFromName(teamname);

  if (!teamData) {
    return <>Could not fetch Team</>;
  }

  return (
    <div className="grid h-[90vh] grid-cols-[25%_auto_auto] grid-rows-2 gap-4 pt-1">
      <div className="col-span-1 row-span-2">
        <TeamProfileCard player={teamData.player} team={teamData.team} />
      </div>
      <div className="col-span-1 row-span-1">
        <TeamScoreChart
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
        <TeamChallengeDiff data={teamData.tag_solves} />
      </div>
      <div className="col-span-2 row-span-1">
        <ScrollArea className="h-[90%]">
          <TeamSolvedChallenge challenge={teamData.solved_challenges} />
        </ScrollArea>
      </div>
    </div>
  );
}
