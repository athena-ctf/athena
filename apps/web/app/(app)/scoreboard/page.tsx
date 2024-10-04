import { ScoreChart } from "@/components/score-chart";
import { TeamScore } from "@/components/team/score";
export default function Page() {
  return (
    <div className="px-5 pt-2">
      <div>
        <ScoreChart
          details={[
            {
              dates: "10-2-2024",
              rank1: 4,
              rank2: 5,
              rank3: 3,
              rank4: 2,
              rank5: 8,
              rank6: 12,
              rank7: 0,
              rank8: 3,
              rank9: 0,
              rank10: 0,
            },
            {
              dates: "12-2-2024",
              rank1: 12,
              rank2: 0,
              rank3: 34,
              rank4: 20,
              rank5: 0,
              rank6: 0,
              rank7: 0,
              rank8: 0,
              rank9: 0,
              rank10: 0,
            },
            {
              dates: "13-2-2024",
              rank1: 28,
              rank2: 0,
              rank3: 34,
              rank4: 0,
              rank5: 22,
              rank6: 0,
              rank7: 34,
              rank8: 0,
              rank9: 39,
              rank10: 0,
            },
          ]}
          names={[
            "team-1",
            "team-2",
            "team-3",
            "team-4",
            "team-5",
            "team-6",
            "team-7",
            "team-8",
            "team-9",
            "team-10",
          ]}
        />
      </div>
      <div className="pt-5">
        <TeamScore
          team={[
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
            {
              rank: 1,
              teamname: "Panda",
              score: 10,
              firstblood: 1,
              secondblood: 2,
              thirdblood: 3,
            },
          ]}
        />
      </div>
    </div>
  );
}
