import { Card, CardContent } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Server, Globe, Anchor } from "lucide-react";
import type { components } from "@repo/api";
import { ctf } from "@/utils/ctf-data";
import { uuidToBase62 } from "@/utils/base62";

export function InstanceCard({
  deploymentId,
  challengeInstance: {
    instance_model: { container_name, port_mapping },
    state,
  },
}: { deploymentId: string; challengeInstance: components["schemas"]["ChallengeInstance"] }) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Server className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm font-semibold">{container_name}</span>
            </div>
            <Badge variant={state === "running" ? "default" : "secondary"} className="text-xs">
              {state === "running" ? "Running" : "Stopped"}
            </Badge>
          </div>
          {port_mapping.map((port) => {
            const [containerPort, hostPort] = port.split(":");
            const url = `${uuidToBase62(deploymentId)}.chall.${ctf.domain}:${hostPort}`;

            return (
              <>
                <div className="flex items-center" key={containerPort}>
                  <Anchor className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">Port: {containerPort}</span>
                </div>
                <div className="flex items-center" key={hostPort}>
                  <Globe className="mr-2 h-4 w-4 opacity-70" />
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline truncate"
                  >
                    {url}
                  </a>
                </div>
              </>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
