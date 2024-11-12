"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { createInvite } from "./actions";
import { type DialogProps, inviteSchema } from "./schemas";
import React, { useState } from "react";

export function InviteDialogContent(props: DialogProps<z.infer<typeof inviteSchema>>) {
  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: props.values,
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof inviteSchema>) => {
    createInvite(values)
      .then((res) => {
        toast.success("Successfully created");
        props.closeDialog();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.action} a invite</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              control={form.control}
              name="remaining"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remaining Usages</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="usages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Usages</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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

export function InviteCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto mr-2 hidden h-8 lg:flex">
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </DialogTrigger>
      <InviteDialogContent action="Create" closeDialog={() => setOpen(false)} />
    </Dialog>
  );
}
