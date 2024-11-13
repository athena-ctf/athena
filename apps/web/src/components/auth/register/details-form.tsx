import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "@/stores/register";
import { Link } from "@tanstack/react-router";
import { fetchClient } from "@repo/api";
import { toast } from "sonner";
import { PasswordInput } from "@repo/ui/components/password-input";

const detailsSchema = z
  .object({
    display_name: z.string().max(100),
    username: z.string().min(2).max(100),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    email: z.string().email(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword !== password, {
    message: "The passwords did not match",
  });

export function DetailsForm({ next }: { next: () => void }) {
  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    mode: "onChange",
  });

  const { setDisplayName, setEmail, setPassword, setUsername } = useRegisterStore();

  const onSubmit = async (values: z.infer<typeof detailsSchema>) => {
    const resp = await fetchClient.GET("/auth/player/register/verify/email", {
      params: { query: { email: values.email } },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      setDisplayName(values.display_name);
      setEmail(values.email);
      setPassword(values.password);
      setUsername(values.username);

      next();
    }
  };

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
                <PasswordInput {...field} />
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
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" search={{ next: "" }} className="underline">
            Login
          </Link>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
