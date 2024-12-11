import { apiClient } from "@/utils/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import type { components } from "@repo/api";
import { Button } from "@repo/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/command";
import { DateTimePicker } from "@repo/ui/components/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";
import { formatISO } from "date-fns";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  remaining: z.number(),
  expires_at: z.date(),
  team_id: z.string().uuid(),
});

type Schema = z.infer<typeof schema>;

export function InviteForm({
  onSuccess,
}: { onSuccess: (model: components["schemas"]["InviteModel"]) => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/invite", {
      body: { ...values, expires_at: formatISO(values.expires_at) },
    });

    if (resp.error) {
      toast.error("Could not create invite");
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [teamIds, setTeamIds] = useState<components["schemas"]["TeamIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/team/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setTeamIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="remaining"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expires_at"
          render={({ field }) => (
            <FormItem className="flex w-72 flex-col gap-2">
              <FormLabel htmlFor="datetime">Expires At</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="team_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Id</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between flex",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value : "Select team"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No team found.</CommandEmpty>
                      <CommandGroup>
                        {teamIds.map((teamId) => (
                          <CommandItem
                            value={teamId.id}
                            key={teamId.id}
                            onSelect={() => {
                              form.setValue("team_id", teamId.id);
                            }}
                          >
                            {teamId.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                teamId.id === field.value ? "opacity-100" : "opacity-0",
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
