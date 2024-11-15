import type { components } from "@repo/api";
import { Nav } from "./nav";
import { ModeToggle } from "./mode-toggle";
import { PlayerNotification } from "./notification";
import { ProfileDropdown } from "./profile-dropdown";
import { Button } from "@repo/ui/components/button";
import { Link, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { CountdownTimer } from "@ui/components/ui/countdown";
import { parseISO } from "date-fns";
import { useCtfStore } from "@/stores/ctf";

export function SiteHeader({
  playerProfile,
  logout,
}: {
  playerProfile?: components["schemas"]["UserModel"];
  logout?: ReactNode;
}) {
  const location = useLocation({ select: (path) => path.pathname });
  const ctf = useCtfStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 max-w-screen-2xl items-center">
        <Nav />
        <nav className="flex items-center justify-end space-x-2">
          <CountdownTimer targetDate={parseISO(ctf.time.end)} />
          <ModeToggle />
          {playerProfile && logout ? (
            <>
              <PlayerNotification />
              <ProfileDropdown user={playerProfile} logout={logout} />
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/auth/login" search={{ next: location }}>
                Login
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
