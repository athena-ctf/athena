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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@ui/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { type FormProps, buttonText } from "./props";

const createSchema = z.object({
  challenge_id: z.string().uuid(),
  tag_id: z.string().uuid(),
});

type CreateSchema = z.infer<typeof createSchema>;

export function CreateChallengeTagForm({
  onSuccess,
  kind,
}: FormProps<"ChallengeTagModel", "join_create">) {
  const form = useForm<CreateSchema>({
    resolver: zodResolver(createSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: CreateSchema) => {
    const resp = await apiClient.POST("/admin/challenge_tag", {
      body: values,
    });

    if (resp.error) {
      toast.error(`Could not ${kind} challenge tag`);
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  const [challengeIds, setChallengeIds] = useState<components["schemas"]["ChallengeIds"][]>([]);
  const [tagIds, setTagIds] = useState<components["schemas"]["TagIds"][]>([]);

  useEffect(() => {
    apiClient.GET("/admin/challenge/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setChallengeIds(res.data);
      }
    });

    apiClient.GET("/admin/tag/ids").then((res) => {
      if (res.error) {
        toast.error("Could not fetch ids");
        console.error(res.error.message);
      } else {
        setTagIds(res.data);
      }
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                        "w-full justify-between flex",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value : "Select challenge"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
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
          name="tag_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tag Id</FormLabel>
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
                      {field.value ? field.value : "Select tag"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search tag..." />
                    <CommandList>
                      <CommandEmpty>No tag found.</CommandEmpty>
                      <CommandGroup>
                        {tagIds.map((tagId) => (
                          <CommandItem
                            value={tagId.id}
                            key={tagId.id}
                            onSelect={() => {
                              form.setValue("tag_id", tagId.id);
                            }}
                          >
                            {tagId.value}
                            <Check
                              className={cn(
                                "ml-auto",
                                tagId.id === field.value ? "opacity-100" : "opacity-0",
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
        <Button type="submit">{buttonText[kind]}</Button>
      </form>
    </Form>
  );
}
