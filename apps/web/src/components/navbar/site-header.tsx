import type { components } from "@repo/api";
import { MainNav } from "./desktop";
import { MobileNav } from "./mobile";
import { ModeToggle } from "./mode-toggle";
import { PlayerNotification } from "./notification";
import { ProfileDropdown } from "./profile-dropdown";
import { Button } from "@repo/ui/components/button";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CtfTimer } from "./ctf-timer";

export function SiteHeader({
  notifications,
  playerProfile,
  logout,
}: {
  notifications?: components["schemas"]["NotificationModel"][];
  playerProfile?: components["schemas"]["UserModel"];
  logout?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <nav className="flex items-center justify-end space-x-2">
          <CtfTimer />
          <ModeToggle />
          {typeof notifications !== "undefined" &&
          typeof playerProfile !== "undefined" ? (
            <>
              <PlayerNotification notifications={notifications} />
              <ProfileDropdown user={playerProfile} logout={logout} />
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
