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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select";
import { createSubmission } from "./actions";
import { type DialogProps, submissionSchema } from "./schemas";
import React, { useState } from "react";

export function SubmissionDialogContent(props: DialogProps<z.infer<typeof submissionSchema>>) {
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    mode: "onSubmit",
    defaultValues: props.values,
  });

  const onSubmit = (values: z.infer<typeof submissionSchema>) => {
    createSubmission(values)
      .then((res) => {
        toast.success("Successfully created");
        props.closeDialog();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.action} a submission</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="flag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flag</FormLabel>
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
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a result" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["pass", "fail"].map((status) => (
                        <SelectItem value={status} key={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export function SubmissionCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto mr-2 hidden h-8 lg:flex">
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </DialogTrigger>
      <SubmissionDialogContent action="Create" closeDialog={() => setOpen(false)} />
    </Dialog>
  );
}
