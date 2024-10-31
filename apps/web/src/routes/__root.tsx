import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider-vite";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/navbar/site-header";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  useEffect(() => {
    const eventSource = new EventSource(""); // TODO: add path
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      toast.info(notification.title, { description: notification.content });
    };

    return () => eventSource.close();
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="athena-theme">
        <div className="relative flex min-h-screen flex-col bg-background">
          <SiteHeader />
          <Outlet />
        </div>
        <Toaster
          richColors
          position="bottom-right"
          closeButton
          visibleToasts={5}
        />
      </ThemeProvider>
    </>
  );
}
