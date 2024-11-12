import type { components } from "@repo/api";
import type { CtfConfig } from "@repo/config/schema";
import { MainNav } from "./desktop";
import { MobileNav } from "./mobile";
import { ModeToggle } from "@/components/navbar/mode-toggle";
import { PlayerNotification } from "@/components/navbar/notification";
import { ProfileDropdown } from "./profile-dropdown";
import { Button } from "@ui/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtfTimer } from "./ctf-timer";

export function SiteHeader({
  notifications,
  playerProfile,
  logout,
  config,
}: {
  notifications?: components["schemas"]["NotificationModel"][];
  playerProfile?: components["schemas"]["UserModel"];
  logout?: ReactNode;
  config: CtfConfig;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-between h-14 max-w-screen-2xl items-center">
        <MainNav config={config} />
        <MobileNav config={config} />
        <nav className="flex items-center justify-end space-x-2">
          <CtfTimer config={config} />
          <ModeToggle />
          {typeof notifications !== "undefined" && typeof playerProfile !== "undefined" ? (
            <>
              <PlayerNotification notifications={notifications} />
              <ProfileDropdown user={playerProfile} logout={logout} />
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
