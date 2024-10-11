import { createFileRoute } from "@tanstack/react-router";
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
import { Eye, EyeOff } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { defineStepper } from "@stepperize/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import { create } from "zustand";

export const Route = createFileRoute("/auth/register")({
  component: Index,
});

const { useStepper } = defineStepper(
  {
    id: "Step 1",
    title: "Details",
    description: "Enter your details below to register to your account",
  },
  {
    id: "Step 2",
    title: "Choose Team",
    description: "Enter your team name and invite code to join",
  },
  {
    id: "Step 3",
    title: "Verify Account",
    description: "Enter the verification code sent to your email",
  },
);

const detailsSchema = z
  .object({
    display_name: z.string().max(100),
    username: z.string().min(2).max(100),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    email: z.string().email(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

const verifyEmailSchema = z.object({
  code: z.string().length(8),
});

const joinTeamSchema = z.object({
  teamname: z.string(),
  inviteCode: z.string().length(8),
});

const createTeamSchema = z.object({
  teamname: z.string(),
});

interface RegisterFormState {
  display_name: string;
  username: string;
  password: string;
  email: string;
  team_choice_kind: "join" | "create";
  teamname: string;
  inviteCode: string;
  code: string;

  setDisplayName: (displayName: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
  setTeamChoiceKind: (teamChoiceKind: "join" | "create") => void;
  setTeamname: (teamname: string) => void;
  setInviteCode: (inviteCode: string) => void;
  setCode: (code: string) => void;
}

const useStore = create<RegisterFormState>((set) => ({
  display_name: "",
  username: "",
  password: "",
  email: "",
  team_choice_kind: "join",
  teamname: "",
  inviteCode: "",
  code: "",

  setDisplayName: (displayName: string) => set({ display_name: displayName }),
  setUsername: (username: string) => set({ username }),
  setPassword: (password: string) => set({ password }),
  setEmail: (email: string) => set({ email }),
  setTeamChoiceKind: (teamChoiceKind: "join" | "create") =>
    set({ team_choice_kind: teamChoiceKind }),
  setTeamname: (teamname: string) => set({ teamname }),
  setInviteCode: (inviteCode: string) => set({ inviteCode }),
  setCode: (code: string) => set({ code }),
}));

export default function Index() {
  const stepper = useStepper();

  return (
    <Card className="m-auto max-w-sm">
      {stepper.switch({
        "Step 1": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <DetailsForm />
            </CardContent>
          </>
        ),
        "Step 2": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChooseTeamForm />
            </CardContent>
          </>
        ),
        "Step 3": (step) => (
          <>
            <CardHeader>
              <CardTitle className="text-2xl">{step.title}</CardTitle>
              <CardDescription>{step.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <VerifyEmailForm />
            </CardContent>
          </>
        ),
      })}
    </Card>
  );
}

function DetailsForm() {
  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    mode: "onChange",
  });

  const { setDisplayName, setEmail, setPassword, setUsername } = useStore();

  const stepper = useStepper();

  function onSubmit(values: z.infer<typeof detailsSchema>) {
    setDisplayName(values.display_name);
    setEmail(values.email);
    setPassword(values.password);
    setUsername(values.username);

    stepper.next();
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input {...field} type={showPassword ? "text" : "password"} />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                    {showPassword ? (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                    {showConfirmPassword ? (
                      <Eye
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <EyeOff
                        size={18}
                        strokeWidth={1.5}
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>
                </div>
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
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}

function VerifyEmailForm() {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const { setCode } = useStore();

  const stepper = useStepper();

  function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
    setCode(values.code);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
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
          <Button onClick={() => stepper.prev()}>Back</Button>
          <Button type="submit">Register</Button>
        </div>
      </form>
    </Form>
  );
}

function ChooseTeamForm() {
  const joinForm = useForm<z.infer<typeof joinTeamSchema>>({
    resolver: zodResolver(joinTeamSchema),
    mode: "onChange",
  });

  const { setTeamname, setTeamChoiceKind, setInviteCode } = useStore();

  const stepper = useStepper();

  function onJoinFormSubmit(values: z.infer<typeof joinTeamSchema>) {
    setTeamChoiceKind("join");
    setTeamname(values.teamname);
    setInviteCode(values.inviteCode);

    stepper.next();
  }

  const createForm = useForm<z.infer<typeof createTeamSchema>>({
    resolver: zodResolver(createTeamSchema),
    mode: "onChange",
  });

  function onCreateFormSubmit(values: z.infer<typeof createTeamSchema>) {
    setTeamChoiceKind("create");
    setTeamname(values.teamname);

    stepper.next();
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
            />{" "}
            <Button type="submit" className="w-full">
              Register
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/register" className="underline">
                Login
              </Link>
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
            <Button type="submit" className="w-full">
              Register
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/register" className="underline">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
}
