import type { components } from "@repo/api";
import { Button } from "@ui/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table";

export function TeamModal({
  team,
  total_points,
  players,
}: components["schemas"]["TeamPoints"]) {
  return (
    <DialogContent className="flex flex-col">
      <DialogHeader className="place-items-center">
        <DialogTitle>{team.name}</DialogTitle>
      </DialogHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">FullName</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((member) => (
            <TableRow key={member.player.id}>
              <TableCell className="font-medium">
                {member.player.display_name}
              </TableCell>
              <TableCell className="text-right">{member.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">{total_points}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <DialogFooter className="mx-auto">
        <Button className="">Request To Join</Button>
      </DialogFooter>
    </DialogContent>
  );
}
