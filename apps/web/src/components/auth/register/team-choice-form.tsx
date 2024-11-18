import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/tabs";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "@/stores/register";
import { fetchClient } from "@repo/api";
import { toast } from "sonner";

const joinTeamSchema = z.object({
  teamName: z.string(),
  inviteCode: z.string(),
});

const createTeamSchema = z.object({
  teamName: z.string(),
});

export function ChooseTeamForm({
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
    const resp = await fetchClient.GET("/auth/player/register/verify/invite", {
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

      const respSendToken = await fetchClient.POST("/auth/player/register/send-token", {
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

    const resp = await fetchClient.POST("/auth/player/register/send-token", {
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
  );
}
