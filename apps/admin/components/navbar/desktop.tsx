"use client";

import type { CtfConfig } from "@repo/config/schema";
import { cn } from "@ui/lib/utils";
import { default as NextImage } from "next/image";
import Link from "next/link";

export function MainNav({ config }: { config: CtfConfig }) {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <NextImage src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
        <span className="hidden font-bold sm:inline-block">{config.ctf.name}</span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/challenges"
          className={cn("text-foreground/60 transition-colors hover:text-foreground/80")}
        >
          Challenges
        </Link>
        <Link
          href="/scoreboard"
          className={cn("text-foreground/60 transition-colors hover:text-foreground/80")}
        >
          Scoreboard
        </Link>
        <Link
          href="/teams"
          className={cn("text-foreground/60 transition-colors hover:text-foreground/80")}
        >
          Teams
        </Link>
        <Link
          href="/rules"
          className={cn("text-foreground/60 transition-colors hover:text-foreground/80")}
        >
          Rules
        </Link>
      </nav>
    </div>
  );
}
