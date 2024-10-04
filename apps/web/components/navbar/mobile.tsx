"use client";

import type { CtfConfig } from "@repo/config/schema";
import { Button } from "@ui/components/ui/button";
import { ScrollArea } from "@ui/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@ui/components/ui/sheet";
import { cn } from "@ui/lib/utils";
import { default as NextImage } from "next/image";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MobileNav({ config }: { config: CtfConfig }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <Sheet open={openNav} onOpenChange={setOpenNav}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
          >
            <title>The button to open mobile nav</title>
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpenNav}
        >
          <NextImage src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
          <span className="font-bold">{config.ctf.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink href="/challenges" onOpenChange={setOpenNav}>
              Challenges
            </MobileLink>
            <MobileLink href="/scoreboard" onOpenChange={setOpenNav}>
              Scoreboard
            </MobileLink>
            <MobileLink href="/teams" onOpenChange={setOpenNav}>
              Teams
            </MobileLink>
            <MobileLink href="/rules" onOpenChange={setOpenNav}>
              Rules
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (_: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
