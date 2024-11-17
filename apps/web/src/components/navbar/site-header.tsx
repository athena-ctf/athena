import type { components } from "@repo/api";
import { ThemeToggle } from "./theme-toggle";
import { PlayerNotification } from "./notification";
import { ProfileDropdown } from "./profile-dropdown";
import { Button } from "@repo/ui/components/button";
import { Link, useLocation } from "@tanstack/react-router";
import { CountdownTimer } from "@ui/components/ui/countdown";
import { parseISO } from "date-fns";
import { useCtfStore } from "@/stores/ctf";

export function SiteHeader({
  playerProfile,
}: {
  playerProfile?: components["schemas"]["PlayerProfile"];
}) {
  const location = useLocation({ select: (path) => path.pathname });
  const ctf = useCtfStore();

  const navLinks = [
    { to: "/challenges", text: "Challenges" },
    { to: "/scoreboard/team", text: "Scoreboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
            <span className="font-bold">{ctf.name}</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-foreground/60 transition-colors hover:text-foreground/80"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
        <nav className="flex items-center space-x-2">
          <CountdownTimer targetDate={parseISO(ctf.time.end)} />
          <ThemeToggle />
          {playerProfile ? (
            <>
              <PlayerNotification />
              <ProfileDropdown playerProfile={playerProfile} />
            </>
          ) : (
            <Button>
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
