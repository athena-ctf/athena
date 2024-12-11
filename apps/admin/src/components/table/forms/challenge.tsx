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
import { Input } from "@repo/ui/components/input";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@repo/ui/components/command";
import { Popover, PopoverTrigger, PopoverContent } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";
import { ChevronsUpDown, Check } from "lucide-react";
import { MinimalTiptapEditor } from "@/components/rich-text-editor";
import { ctf } from "@/utils/ctf-data";
import type { components } from "@repo/api";
import { toast } from "sonner";

const kinds = [
  "dynamic_containerized",
  "regex_flag",
  "static_containerized",
  "static_flag",
] as const;

const schema = z.object({
  title: z.string(),
  description: z.string(),
  points: z.number(),
  level: z.number(),
  kind: z.enum(kinds),
  author_name: z.string(),
});

type Schema = z.infer<typeof schema>;

export function ChallengeForm({
  onSuccess,
}: { onSuccess: (model: components["schemas"]["ChallengeModel"]) => void }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (values: Schema) => {
    const resp = await apiClient.POST("/admin/challenge", {
      body: values,
    });

    if (resp.error) {
      toast.error("Could not create challenge");
      console.error(resp.error.message);
    } else {
      onSuccess(resp.data);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="points"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
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
                      {field.value ? field.value : "Select level"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search level..." />
                    <CommandList>
                      <CommandEmpty>No level found.</CommandEmpty>
                      <CommandGroup>
                        {Object.entries(ctf.level_map).map(([level, name]) => (
                          <CommandItem
                            value={level}
                            key={name.name}
                            onSelect={() => {
                              form.setValue("level", Number.parseInt(level));
                            }}
                          >
                            {name.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                field.value && level === field.value.toString()
                                  ? "opacity-100"
                                  : "opacity-0",
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
          name="kind"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Challenge Kind</FormLabel>
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
                      {field.value ? field.value : "Select challenge kind"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search challenge kind..." />
                    <CommandList>
                      <CommandEmpty>No challenge kind found.</CommandEmpty>
                      <CommandGroup>
                        {kinds.map((kind) => (
                          <CommandItem
                            value={kind}
                            key={kind}
                            onSelect={() => {
                              form.setValue("kind", kind);
                            }}
                          >
                            {kind}
                            <Check
                              className={cn(
                                "ml-auto",
                                kind === field.value ? "opacity-100" : "opacity-0",
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Description</FormLabel>
              <FormControl>
                <MinimalTiptapEditor
                  {...field}
                  throttleDelay={0}
                  className={cn("h-full min-h-56 w-full rounded-xl", {
                    "border-destructive focus-within:border-destructive":
                      form.formState.errors.description,
                  })}
                  editorContentClassName="overflow-auto h-full flex grow"
                  output="html"
                  placeholder="Type your description here..."
                  editable={true}
                  editorClassName="focus:outline-none px-5 py-4 h-full grow"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
