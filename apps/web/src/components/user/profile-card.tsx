import type { components } from "@repo/api";
import { Card, CardContent } from "@repo/ui/components/card";
import UserUpdateDialog from "@/components/user/update-dialog";
import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { hash } from "@/utils/hash";

export function UserProfileCard({
  player,
  user,
}: {
  player: components["schemas"]["PlayerModel"];
  user: components["schemas"]["UserModel"];
}) {
  const [url, setUrl] = useState("");

  useEffect(() => {
    hash(user.email).then(setUrl);
  });

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col place-items-center justify-around space-y-10">
        <div className="flex w-full flex-col items-center space-y-10 py-8">
          <img
            src={`https://gravatar.com/avatar/${url}?d=robohash&s=200`}
            alt={user.username}
            className="rounded-full"
            width={200}
            height={200}
          />
          <div className="flex w-full flex-col space-y-2">
            <div className="flex justify-between align-middle">
              <span className="text-lg font-semibold">{user.username}</span>
              <UserUpdateDialog player={player} />
            </div>
            <span className="text-sm text-neutral-500">@{user.username}</span>
          </div>
          <div className="flex w-full flex-col space-y-3">
            <div className="flex">
              <Mail />
              <Link to={`mailto:${user.email}`} className="mx-2">
                {user.email}
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
