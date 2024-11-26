import type { components } from "@repo/api";
import { Card, CardContent } from "@repo/ui/components/card";
import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
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
  profile,
}: {
  profile: components["schemas"]["TeamProfile"];
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col place-items-center justify-around space-y-10">
        <div className="flex w-full flex-col space-y-2">
          <span className="text-lg font-semibold">{profile.team.name}</span>
        </div>
        <div className="flex w-full flex-col space-y-3">
          <div className="flex">
            <Mail />
            <Link to={`mailto:${profile.team.email}`} className="mx-2">
              {profile.team.email}
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
              {profile.members.map((member, idx) => (
                <TableRow className="items-center" key={member.player.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{member.player.username}</TableCell>
                  <TableCell>{member.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
