"use client";

import { Button } from "@repo/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/card";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/tabs";
import { useState } from "react";

import { createTeam, joinTeam } from "./actions";

export default function Page() {
  const [joinTeamName, setJoinTeamName] = useState("");
  const [createTeamName, setCreateTeamName] = useState("");
  const [createTeamEmail, setCreateTeamEmail] = useState("");

  return (
    <Tabs defaultValue="account" className="mx-auto my-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="createteam">Create Team</TabsTrigger>
        <TabsTrigger value="invite">Join Team</TabsTrigger>
        <TabsTrigger value="jointeam">Request to Join</TabsTrigger>
      </TabsList>
      <TabsContent value="createteam">
        <Card>
          <CardHeader>
            <CardTitle>Create Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="team_name">Team Name</Label>
              <Input
                id="team_name"
                value={createTeamName}
                onChange={(el) => setCreateTeamName(el.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="team_email">Team Email</Label>
              <Input
                id="team_email"
                value={createTeamEmail}
                onChange={(el) => setCreateTeamEmail(el.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() =>
                createTeam(createTeamEmail, createTeamName).then(() =>
                  joinTeam(createTeamName),
                )
              }
            >
              Create & Join
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="invite">
        <Card>
          <CardHeader>
            <CardTitle>Join Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="team_name">Invite ID</Label>
              <Input
                id="team_name"
                value={joinTeamName}
                onChange={(el) => setJoinTeamName(el.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => joinTeam(joinTeamName)}>
              Accept Invite
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="jointeam">
        <Card>
          <CardHeader>
            <CardTitle>Request to Join</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="team_name">Team Name</Label>
              <Input
                id="team_name"
                value={joinTeamName}
                onChange={(el) => setJoinTeamName(el.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => joinTeam(joinTeamName)}>
              Request to join
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
