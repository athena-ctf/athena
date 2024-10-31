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
import { fetchClient } from "@repo/api";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

const verifyEmailSchema = z.object({
  token: z.string().length(8),
});

export function VerifyTokenForm({ prev }: { prev: () => void }) {
  const form = useForm<z.infer<typeof verifyEmailSchema>>({
    resolver: zodResolver(verifyEmailSchema),
    mode: "onChange",
  });

  const store = useRegisterStore();
  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
    const resp = await fetchClient.POST("/auth/player/register", {
      body: {
        display_name: store.displayName,
        email: store.email,
        invite_id: string,
        password: store.password,
        team_id: string,
        username: store.username,
        token: values.token,
      },
    });

    if (resp.error) {
      toast.error(resp.error.message);
    } else {
      toast.success("Successfully registered");
      navigate({ to: "/auth/login", search: { next: "/" } });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Token</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row w-full space-x-4">
          <Button onClick={prev}>Back</Button>
          <Button type="submit">Proceed</Button>
        </div>
      </form>
    </Form>
  );
}
