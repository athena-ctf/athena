import { Toaster } from "@repo/ui/sonner";
import { ThemeProvider } from "@repo/ui/theme-provider";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "../components/navbar/site-header";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => {
      return (
        <>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
