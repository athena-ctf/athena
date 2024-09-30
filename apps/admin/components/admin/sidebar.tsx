import Link from "next/link";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/button";
import type React from "react";

export default function Sidebar({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Tables
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/achievement">Achievements</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/ban">Bans</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/challenge">Challenges</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/file">Files</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/flag">Flags</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/hint">Hints</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/instance">Instances</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/invite">Invites</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/notification">Notifications</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/player">Players</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/submission">Submissions</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/tag">Tags</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/team">Teams</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/table/user">Users</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
