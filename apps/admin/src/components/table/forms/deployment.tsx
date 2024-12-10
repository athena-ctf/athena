import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/form";
import { DateTimePicker } from "@repo/ui/components/date-time-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@repo/ui/components/command";
import { useEffect, useState } from "react";
import type { components } from "@repo/api";
import { toast } from "sonner";
import { formatISO } from "date-fns";

const schema = z.object({
  expires_at: z.date(),
  challenge_id: z.string().uuid(),
  player_id: z.string().uuid().optional(),
});

type Schema = z.infer<typeof schema>;

export function DeploymentForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/deployment", {
      body: { ...values, expires_at: formatISO(values.expires_at) },
    });
  };

  const [challengeIds, setChallengeIds] = useState<components["schemas"]["ChallengeIds"][]>([]);
  const [playerIds, setPlayerIds] = useState<components["schemas"]["PlayerIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/challenge/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setChallengeIds(res.data);
      }
    });

    apiClient.GET("/admin/player/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setPlayerIds(res.data);
      }
    });
  }, []);

  return (
    <Card className="m-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create Deployment</CardTitle>
        <CardDescription>Create a new deployment</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="expires_at"
              render={({ field }) => (
                <FormItem className="flex w-72 flex-col gap-2">
                  <FormLabel htmlFor="datetime">Date time</FormLabel>
                  <FormControl>
                    <DateTimePicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="challenge_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Id</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? field.value : "Select challenge"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search challenge..." />
                        <CommandList>
                          <CommandEmpty>No challenge found.</CommandEmpty>
                          <CommandGroup>
                            {challengeIds.map((challengeId) => (
                              <CommandItem
                                value={challengeId.id}
                                key={challengeId.id}
                                onSelect={() => {
                                  form.setValue("challenge_id", challengeId.id);
                                }}
                              >
                                {challengeId.title}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    challengeId.id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="player_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player Id</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? field.value : "Select player"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search player..." />
                        <CommandList>
                          <CommandEmpty>No player found.</CommandEmpty>
                          <CommandGroup>
                            {playerIds.map((playerId) => (
                              <CommandItem
                                value={playerId.id}
                                key={playerId.id}
                                onSelect={() => {
                                  form.setValue("player_id", playerId.id);
                                }}
                              >
                                {playerId.username}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    playerId.id === field.value ? "opacity-100" : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
