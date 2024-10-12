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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui/components/tabs";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "../../../stores/register";

const joinTeamSchema = z.object({
  teamname: z.string(),
  inviteCode: z.string().length(8),
});

const createTeamSchema = z.object({
  teamname: z.string(),
});

export function ChooseTeamForm({
  next,
  prev,
}: { next: () => void; prev: () => void }) {
  const joinForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    mode: "onChange",
  });

  const { setTeamname, setTeamChoiceKind, setInviteCode } = useRegisterStore();

  function onJoinFormSubmit(values: z.infer<typeof joinTeamSchema>) {
    setTeamChoiceKind("join");
    setTeamname(values.teamname);
    setInviteCode(values.inviteCode);

    // TODO: send code api call here

    next();
  }

  const createForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
  });

  function onCreateFormSubmit(values: z.infer<typeof createTeamSchema>) {
    setTeamChoiceKind("create");
    setTeamname(values.teamname);

    next();
  }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="creat">Create Team</TabsTrigger>
        <TabsTrigger value="join">Join Team</TabsTrigger>
      </TabsList>
      <TabsContent value="create">
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit(onCreateFormSubmit)}
            className="space-y-2"
          >
            <FormField
              control={createForm.control}
              name="teamname"
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
              <Link href="/auth/register" className="underline">
                Login
              </Link>
            </div>
            <div className="flex flex-row w-full space-x-4">
              <Button onClick={prev}>Back</Button>
              <Button type="submit">Send Code</Button>
            </div>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="join">
        <Form {...joinForm}>
          <form
            onSubmit={joinForm.handleSubmit(onJoinFormSubmit)}
            className="space-y-2"
          >
            <FormField
              control={joinForm.control}
              name="teamname"
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
              <Link href="/auth/register" className="underline">
                Login
              </Link>
            </div>
            <div className="flex flex-row w-full space-x-4">
              <Button onClick={prev}>Back</Button>
              <Button type="submit">Send Code</Button>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
