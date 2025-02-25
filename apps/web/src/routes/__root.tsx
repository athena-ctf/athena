import { SiteHeader } from "@/components/navbar/site-header";
import { ctf } from "@/utils/ctf-data";
import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  useEffect(() => {
    const eventSource = new EventSource(`events.${ctf.domain}`);
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      toast.info(notification.title, { description: notification.content });
    };

    return () => eventSource.close();
  }, []);

  return (
    <ThemeProvider storageKey="athena-theme">
      <div className="relative flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <Outlet />
      </div>
      <Toaster richColors position="bottom-right" closeButton visibleToasts={5} />
    </ThemeProvider>
  );
}
