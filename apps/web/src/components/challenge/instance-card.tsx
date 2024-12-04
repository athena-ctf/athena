import { Card, CardContent } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Server, Link2, EthernetPort } from "lucide-react";
import type { components } from "@repo/api";
import { ctf } from "@/utils/ctf-data";
import { uuidToBase62 } from "@/utils/base62";

const stateColorMap = {
  Created: "bg-blue-200 text-blue-800",
  Running: "bg-green-200 text-green-800",
  Paused: "bg-yellow-200 text-yellow-800",
  Restarting: "bg-amber-200 text-amber-800",
  Removing: "bg-orange-200 text-orange-800",
  Exited: "bg-red-200 text-red-800",
  Dead: "bg-gray-200 text-gray-800",
} as const;

export function InstanceCard({
  instance_model: { container_name, port_mapping, deployment_id },
  state,
}: components["schemas"]["ChallengeInstance"]) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Server className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm font-semibold">{container_name}</span>
            </div>
            <Badge className={`text-xs ${stateColorMap[state]}`}>{state}</Badge>
          </div>
          {port_mapping.map((port) => {
            const [containerPort, hostPort] = port.split(":");
            const url = `${uuidToBase62(deployment_id)}.chall.${ctf.domain}:${hostPort}`;

            return (
              <>
                <div className="flex items-center" key={containerPort}>
                  <EthernetPort className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">Port: {containerPort}</span>
                </div>
                <div className="flex items-center" key={hostPort}>
                  <Link2 className="mr-2 h-4 w-4 opacity-70" />
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
