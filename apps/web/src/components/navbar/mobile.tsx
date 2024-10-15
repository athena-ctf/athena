import { Button } from "@repo/ui/components/button";
import { ScrollArea } from "@repo/ui/components/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/sheet";
import { cn } from "@repo/ui/lib/utils";
import { type LinkProps, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function MobileNav() {
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
          to="/"
          className="flex items-center"
          onOpenChange={setOpenNav}
        >
          <img src="/logo.jpeg" alt="CTF Logo" width={16} height={16} />
          {/* TODO: read from config <span className="font-bold">{config.ctf.name}</span> */}
          <span className="font-bold">Athena CTF</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            <MobileLink to="/challenges" onOpenChange={setOpenNav}>
              Challenges
            </MobileLink>
            <MobileLink to="/scoreboard/team" onOpenChange={setOpenNav}>
              Scoreboard
            </MobileLink>
            <MobileLink to="/rules" onOpenChange={setOpenNav}>
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
  to,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const navigate = useNavigate();
  return (
    <Link
      to={to}
      onClick={() => {
        navigate({ to });
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
