import type { components } from "@repo/api";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { hash } from "@/utils/hash";

export function ProfileDropdown({
  user,
  logout,
}: {
  user: components["schemas"]["UserModel"];
  logout: ReactNode;
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    hash(user.email).then(setUrl);
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={`https://gravatar.com/avatar/${url}?d=robohash`}
            alt={user.username}
          />
          <AvatarFallback>{user.username}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>
          <div className="place-content-center">
            <span className="font-mono text-sm font-light">
              @{user.username}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={"/profile"}>View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>{logout}</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
