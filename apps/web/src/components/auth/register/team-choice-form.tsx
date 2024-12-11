import { useRegisterStore } from "@/stores/register";
import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/tabs";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const joinTeamSchema = z.object({
  teamName: z.string(),
  inviteCode: z.string(),
});

const createTeamSchema = z.object({
  teamName: z.string(),
});

export function TeamChoiceForm({
  next,
  prev,
}: {
  next: () => void;
  prev: () => void;
}) {
  const joinForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    mode: "onChange",
  });

  const { setTeam, email } = useRegisterStore();

  const onJoinFormSubmit = async (values: z.infer<typeof joinTeamSchema>) => {
    const resp = await apiClient.GET("/auth/player/register/verify/invite", {
      params: {
        query: { invite_code: values.inviteCode, team_name: values.teamName },
      },
    });

    if (resp.error) {
      toast.error("Invalid invite id");
      console.error(resp.error.message);
    } else {
      setTeam({
        kind: "join",
        team_id: resp.data.team_id,
        invite_id: resp.data.invite_id,
      });

      const respSendToken = await apiClient.POST("/auth/player/register/send-token", {
        body: { email },
      });

      if (respSendToken.error) {
        toast.error(respSendToken.error.message);
      } else {
        toast.info("Sent token to email");
        next();
      }
    }
  };

  const createForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
  });

  const onCreateFormSubmit = async (values: z.infer<typeof createTeamSchema>) => {
    setTeam({
      kind: "create",
      team_name: values.teamName,
    });

    const resp = await apiClient.POST("/auth/player/register/send-token", {
      body: { email },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      toast.info("Sent token to email");
      next();
    }
  };

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Team</CardTitle>
        <CardDescription>Create a team or join a team</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="create">
          <TabsList>
            <TabsTrigger value="create">Create Team</TabsTrigger>
            <TabsTrigger value="join">Join Team</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Form {...createForm}>
              <form onSubmit={createForm.handleSubmit(onCreateFormSubmit)} className="space-y-2">
                <FormField
                  control={createForm.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/auth/login" search={{ next: "" }} className="underline">
                    Login
                  </Link>
                </div>
                <div className="flex flex-row w-full space-x-4">
                  <Button onClick={prev}>Back</Button>
                  <Button type="submit">Send Token</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="join">
            <Form {...joinForm}>
              <form onSubmit={joinForm.handleSubmit(onJoinFormSubmit)} className="space-y-2">
                <FormField
                  control={joinForm.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={joinForm.control}
                  name="inviteCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invite Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/auth/register" className="underline">
                    Login
                  </Link>
                </div>
                <div className="flex flex-row w-full space-x-4">
                  <Button onClick={prev}>Back</Button>
                  <Button type="submit">Send Token</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
