"use client";

import { logout } from "@/lib/actions";
import { Alert } from "@repo/ui/alert";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    logout();
  });

  return (
    <Alert className="mx-auto mt-5 w-11/12">
      You have been successfully logged out
    </Alert>
  );
}
