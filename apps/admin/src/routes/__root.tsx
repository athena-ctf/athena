import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { Toaster } from "@repo/ui/components/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@ui/components/ui/sidebar";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  return (
    <ThemeProvider storageKey="athena-theme">
      <SidebarProvider>
        <div className="relative flex min-h-screen flex-col bg-background">
          <AppSidebar />
          <Outlet />
        </div>
        <Toaster richColors position="bottom-right" closeButton visibleToasts={5} />
      </SidebarProvider>
    </ThemeProvider>
  );
}
