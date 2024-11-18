import type { components } from "@repo/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

export function SolvedChallenge({
  challenge,
  className,
}: {
  challenge: components["schemas"]["ChallengeModel"][];
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Solved Challenges</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
