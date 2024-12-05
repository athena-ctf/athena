import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import type { components } from "@repo/api";
import { getOrdinal } from "@/utils/get-ordinal";
import { cn } from "@repo/ui/lib/utils";

export function ProfileCard({
  playerProfile,
  className,
}: { playerProfile: components["schemas"]["PlayerProfile"]; className?: string }) {
  return (
    <Card className={cn("w-full mx-auto max-w-md", className)}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        <Avatar className="w-24 h-24">
          <AvatarImage src={playerProfile.player.avatar_url} alt={playerProfile.player.username} />
          <AvatarFallback>{playerProfile.player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{playerProfile.player.username}</h2>
          <p className="text-sm text-muted-foreground">{playerProfile.player.email}</p>
        </div>

        <div className="flex justify-around w-full text-sm min-h-[80px]">
          <div>
            <p className="font-semibold">Rank</p>
            <p className="text-3xl font-bold text-primary">{getOrdinal(playerProfile.rank)}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Score</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-primary">
                {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
                  playerProfile.score,
                )}
              </p>
              <span className="text-xs text-muted-foreground">pts</span>
            </div>
          </div>
        </div>

        <div className="flex justify-start space-x-4 w-full pt-4 border-t">
          {playerProfile.awards.map((award) => (
            <div className="relative" key={award.id}>
              <img src={award.logo_url} alt={award.value} className="w-10 h-10 rounded-full" />
              <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 flex items-center justify-center">
                {award.count}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
