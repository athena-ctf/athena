import type { components } from "@repo/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";

export function UserSolvedChallenge({
  challenge,
}: {
  challenge: components["schemas"]["ChallengeModel"][];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="items-center">Challenge Name</TableHead>
          <TableHead className="items-center">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="items-center">
        {challenge.map((challenge) => (
          <TableRow className="items-center" key={challenge.title}>
            <TableCell>{challenge.title}</TableCell>
            <TableCell>{challenge.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
