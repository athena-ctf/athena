import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import type { components } from "@repo/api";
import { getOrdinal } from "@/utils/get-ordinal";
import { cn } from "@repo/ui/lib/utils";

interface ProfileCardProps {
  name: string;
  email: string;
  awards: components["schemas"]["AwardsReceived"][];
  rank: number;
  score: number;
  className?: string;
  extra: { kind: "player"; avatarUrl: string } | { kind: "team"; memberCount: number };
}

export function ProfileCard({
  name,
  email,
  awards,
  extra,
  rank,
  score,
  className,
}: ProfileCardProps) {
  return (
    <Card className={cn("w-full mx-auto max-w-md", className)}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-6 space-y-4">
        {extra.kind === "player" && (
          <Avatar className="w-24 h-24">
            <AvatarImage src={extra.avatarUrl} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        )}

        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">
            {email}
            {extra.kind === "team" && (
              <span>
                &nbsp;&bull; {extra.memberCount} member{extra.memberCount > 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        <div className="flex justify-around w-full text-sm min-h-[80px]">
          <div>
            <p className="font-semibold">Rank</p>
            <p className="text-3xl font-bold text-primary">{getOrdinal(rank)}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">Score</p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-primary">
                {Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(score)}
              </p>
              <span className="text-xs text-muted-foreground">pts</span>
            </div>
          </div>
        </div>

        <div className="flex justify-start space-x-4 w-full pt-4 border-t">
          {awards.map((award) => (
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
