import { Toaster } from "@repo/ui/components/sonner";
import { ThemeProvider } from "@repo/ui/components/theme-provider-vite";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/navbar/site-header";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      return (
        <>
          <ThemeProvider defaultTheme="system" storageKey="athena-theme">
            <div className="relative flex min-h-screen flex-col bg-background">
              <SiteHeader />
              <Outlet />
            </div>
            <Toaster richColors />
          </ThemeProvider>
        </>
      );
    },
  },
);
