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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/form";
import { Input } from "@repo/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/select";
import { uploadFile } from "./actions";
import { type DialogProps, fileUploadSchema } from "./schemas";
import React from "react";

export function FileDialogContent(
  props: DialogProps<Omit<z.infer<typeof fileUploadSchema>, "file">>, // TODO: modify
) {
  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: props.values,
    mode: "onSubmit",
  });

  const onSubmit = (values: z.infer<typeof fileUploadSchema>) => {
    uploadFile(values)
      .then((res) => {
        toast.success("Successfully created");
        props.closeDialog();
      })
      .catch((err) => toast.error(err));
  };

  const fileRef = form.register("file");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.action} a file</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="backend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a backend" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["s3bucket", "server"].map((difficulty) => (
                        <SelectItem value={difficulty} key={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
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

export function FileCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto mr-2 hidden h-8 lg:flex">
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </DialogTrigger>
      <FileDialogContent action="Create" closeDialog={() => setOpen(false)} />
    </Dialog>
  );
}
