import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@repo/ui/components/alert";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

export const Route = createFileRoute("/auth/logout")({
  component: Index,
});

export default function Index() {
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Alert className="mx-auto mt-5 w-11/12">
      You have been successfully logged out
    </Alert>
  );
}
