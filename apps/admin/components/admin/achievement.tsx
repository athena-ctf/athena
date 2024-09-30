"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { createAchievement } from "./actions";
import { type DialogProps, achievementSchema } from "./schemas";
import React from "react";

export function AchievementDialogContent(
  props: DialogProps<z.infer<typeof achievementSchema>>,
) {
  const form = useForm<z.infer<typeof achievementSchema>>({
    resolver: zodResolver(achievementSchema),
    mode: "onSubmit",
    defaultValues: props.values,
  });

  const onSubmit = (values: z.infer<typeof achievementSchema>) => {
    createAchievement(values)
      .then((res) => {
        toast.success("Successfully created");
        props.closeDialog();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.action} a achievement</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Challenge ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="player_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Player ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Team ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">{props.action}</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
}

export function AchievementCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto mr-2 hidden h-8 lg:flex"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </DialogTrigger>
      <AchievementDialogContent
        action="Create"
        closeDialog={() => setOpen(false)}
      />
    </Dialog>
  );
}
