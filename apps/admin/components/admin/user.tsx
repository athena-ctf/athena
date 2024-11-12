"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, PlusCircle } from "lucide-react";
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
import { createUser } from "./actions";
import { type DialogProps, userSchema } from "./schemas";
import React from "react";

export function UserDialogContent(props: DialogProps<z.infer<typeof userSchema>>) {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: props?.values,
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    createUser(values)
      .then((res) => {
        toast.success("Successfully created");
        props.closeDialog();
      })
      .catch((err) => toast.error(err));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.action} a user</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["manager", "player"].map((role) => (
                        <SelectItem value={role} key={role}>
                          {role}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input {...field} type={showPassword ? "text" : "password"} />
                      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
                        {showPassword ? (
                          <Eye size={18} strokeWidth={1.5} onClick={() => setShowPassword(false)} />
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
            <DialogClose asChild>
              <Button type="submit">{props.action}</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
}

export function UserCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto mr-2 hidden h-8 lg:flex">
          <PlusCircle className="mr-2 h-4 w-4" /> Create
        </Button>
      </DialogTrigger>
      <UserDialogContent action="Create" closeDialog={() => setOpen(false)} />
    </Dialog>
  );
}
