import { ScrollArea } from "@ui/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";
import { Medal } from "lucide-react";

interface TeamScoreProps {
  team: {
    rank: number;
    teamname: string;
    score: number;
    firstblood: number;
    secondblood: number;
    thirdblood: number;
  }[];
}

export function TeamScore({ team }: TeamScoreProps) {
  return (
    <div className="my-0">
      <ScrollArea className="h-[350px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="items-center">Rank</TableHead>
              <TableHead className="items-center">Team Name</TableHead>
              <TableHead className="items-center">Score</TableHead>
              <TableHead className="items-center">
                <Medal className="size-5 text-yellow-500" />
              </TableHead>
              <TableHead className="items-center">
                <Medal className="size-5 text-slate-500" />
              </TableHead>
              <TableHead className="items-center">
                <Medal className="size-5 text-amber-900" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="items-center">
            {team.map((team, idx) => (
              <TableRow className="items-center" key={team.rank}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{team.teamname}</TableCell>
                <TableCell>{team.score}</TableCell>
                <TableCell>{team.firstblood}</TableCell>
                <TableCell>{team.secondblood}</TableCell>
                <TableCell>{team.thirdblood}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
