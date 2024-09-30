import { client } from "@repo/api";
import { Alert, AlertTitle } from "@repo/ui/alert";
import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { CircleX } from "lucide-react";
import { cookies } from "next/headers";

async function getStats() {
  const { data, error } = await client.GET("/stats", {
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });

  if (error) {
    return { error };
  }

  return { data };
}

export default async function Page() {
  const stats = await getStats();

  return stats.error ? (
    <Alert variant="destructive" className="mx-auto my-6 w-11/12">
      <CircleX className="size-4" />
      <AlertTitle>Error while fetching data</AlertTitle>
    </Alert>
  ) : (
    <div className="grid grid-cols-4 space-x-2 space-y-2">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Achievements</CardDescription>
          <CardTitle className="text-4xl">{stats.data.achievement}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Bans</CardDescription>
          <CardTitle className="text-4xl">{stats.data.ban}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Challenges</CardDescription>
          <CardTitle className="text-4xl">{stats.data.challenge}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Files</CardDescription>
          <CardTitle className="text-4xl">{stats.data.file}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Flags</CardDescription>
          <CardTitle className="text-4xl">{stats.data.flag}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Hints</CardDescription>
          <CardTitle className="text-4xl">{stats.data.hint}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Instances</CardDescription>
          <CardTitle className="text-4xl">{stats.data.instance}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Invites</CardDescription>
          <CardTitle className="text-4xl">{stats.data.invite}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Notifications</CardDescription>
          <CardTitle className="text-4xl">{stats.data.notification}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Players</CardDescription>
          <CardTitle className="text-4xl">{stats.data.player}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Submissions</CardDescription>
          <CardTitle className="text-4xl">{stats.data.submission}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Tags</CardDescription>
          <CardTitle className="text-4xl">{stats.data.tag}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Teams</CardDescription>
          <CardTitle className="text-4xl">{stats.data.team}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Users</CardDescription>
          <CardTitle className="text-4xl">{stats.data.user}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
