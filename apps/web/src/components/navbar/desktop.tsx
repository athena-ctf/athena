"use client";

import { cn } from "@repo/ui/lib/utils";
import { Link } from "@tanstack/react-router";

export function MainNav() {
  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-6 flex items-center space-x-2">
        <img src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
        {/* TODO: read from config <span className="font-bold hidden sm:inline-block">{config.ctf.name}</span> */}
        <span className="font-bold hidden sm:inline-block">Athena CTF</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          to="/challenges"
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80",
          )}
        >
          Challenges
        </Link>
        <Link
          to="/scoreboard/team"
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80",
          )}
        >
          Scoreboard
        </Link>
        <Link
          to="/rules"
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80",
          )}
        >
          Rules
        </Link>
      </nav>
    </div>
  );
}
