import type { components } from "@repo/api";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { sha256 } from "js-sha256";
import Link from "next/link";
import type { ReactNode } from "react";

export function ProfileDropdown({
  user,
  logout,
}: {
  user: components["schemas"]["UserModel"];
  logout: ReactNode;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={`https://gravatar.com/avatar/${sha256(user.email)}?d=robohash`}
            alt={user.username}
          />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>
          <div className="place-content-center">
            <span className="font-mono text-sm font-light">@{user.username}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/profile/${user.username}`}>View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>{logout}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
