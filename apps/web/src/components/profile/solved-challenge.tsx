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
  challenges,
  className,
}: {
  challenges: components["schemas"]["ChallengeModel"][];
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Solved Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        {challenges.length === 0 ? (
          <div className="text-gray-500">No challenges solved.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="items-center">Title</TableHead>
                <TableHead className="items-center">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="items-center">
              {challenges.map((challenge) => (
                <TableRow className="items-center" key={challenge.id}>
                  <TableCell>{challenge.title}</TableCell>
                  <TableCell>{challenge.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
