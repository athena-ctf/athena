import { createFileRoute } from "@tanstack/react-router";
import { Alert } from "@repo/ui/components/alert";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth";
import { fetchClient } from "@repo/api";

export const Route = createFileRoute("/auth/logout")({
  component: Index,
});

export default function Index() {
  const { logout } = useAuthStore();
  const [message, setMessage] = useState("Loggin out...");

  useEffect(() => {
    fetchClient.GET("/auth/player/logout").then((resp) => {
      if (resp.error) {
        setMessage(resp.error.message);
      } else {
        logout();
        setMessage("You have been successfully logged out");
      }
    });
  }, [logout]);

  return <Alert className="mx-auto mt-5 w-11/12">{message}</Alert>;
}
