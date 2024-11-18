import type { components } from "@repo/api";
import { Card, CardContent } from "@repo/ui/components/card";
import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import TeamUpdateDialog from "./update-dialog";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

export function TeamProfileCard({
  player,
  team,
}: {
  player: components["schemas"]["PlayerModel"];
  team: components["schemas"]["TeamModel"];
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col place-items-center justify-around space-y-10">
        <div className="flex w-full flex-col space-y-2">
          <div className="flex justify-between align-middle">
            <span className="text-lg font-semibold">{player.username}</span>
            <TeamUpdateDialog player={player} />
          </div>
          <span className="text-sm text-neutral-500">@{team.name}</span>
        </div>
        <div className="flex w-full flex-col space-y-3">
          <div className="flex">
            <Mail />
            <Link to={`mailto:${team.email}`} className="mx-2">
              {team.email}
            </Link>
          </div>
        </div>
        <ScrollArea className="h-[350px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="items-center">Rank</TableHead>
                <TableHead className="items-center">Team Name</TableHead>
                <TableHead className="items-center">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="items-center">
              {team.map((name, idx) => (
                <TableRow className="items-center" key={name.rank}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{name.teamname}</TableCell>
                  <TableCell>{name.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
