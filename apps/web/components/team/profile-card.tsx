import type { components } from "@repo/api";
import { Card, CardContent } from "@ui/components/ui/card";
import { sha256 } from "js-sha256";
import { Mail } from "lucide-react";
import { default as NextImage } from "next/image";
import Link from "next/link";
import TeamUpdateDialog from "./update-dialog";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";

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
        <div className="flex w-full flex-col items-center space-y-10 py-8">
          <NextImage
            src={`https://gravatar.com/avatar/${sha256(
              team.email,
            )}?d=robohash&s=200`}
            alt={team.name}
            className="rounded-full"
            width={200}
            height={200}
          />
          <div className="flex w-full flex-col space-y-2">
            <div className="flex justify-between align-middle">
              <span className="text-lg font-semibold">
                {player.display_name}
              </span>
              <TeamUpdateDialog player={player} />
            </div>
            <span className="text-sm text-neutral-500">@{team.name}</span>
          </div>
          <div className="flex w-full flex-col space-y-3">
            <div className="flex">
              <Mail />
              <Link href={`mailto:${team.email}`} className="mx-2">
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
        </div>
      </CardContent>
    </Card>
  );
}
