import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@repo/ui/components/alert";
import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/auth/logout")({
  component: Index,
});

export default function Index() {
  const { clearTokens } = useAuthStore();
  clearTokens();

  return <Alert className="mx-auto mt-5 w-11/12">"Logged out...</Alert>;
}
