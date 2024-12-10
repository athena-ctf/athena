import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { Toaster } from "@repo/ui/components/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@repo/ui/components/sidebar";
import { TooltipProvider } from "@repo/ui/components/tooltip";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  return (
    <ThemeProvider storageKey="athena-theme">
      <TooltipProvider>
        <SidebarProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <AppSidebar />
            <Outlet />
          </div>
          <Toaster richColors position="bottom-right" closeButton visibleToasts={5} />
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
