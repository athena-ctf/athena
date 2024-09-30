import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <Card className="m-auto flex flex-col">
      <CardHeader>
        <CardTitle>You are about to join teamname</CardTitle>
        <CardDescription className="mx-auto flex pt-3">
          membercout Members
        </CardDescription>
      </CardHeader>
      <CardContent className="mx-auto mt-10 flex">
        <Button>Accept invite</Button>
      </CardContent>
    </Card>
  );
}
