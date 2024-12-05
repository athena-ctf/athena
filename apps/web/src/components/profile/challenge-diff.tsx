import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import type { components } from "@repo/api";

interface Data {
  data: components["schemas"]["TagSolves"][];
}

const chartConfig = {
  solves: {
    label: "Solves",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function ChallengeDiff({ data }: Data) {
  return (
    <Card className="max-w-md">
      <CardHeader className="items-center">
        <CardTitle>Challenge Map</CardTitle>
        <CardDescription>Showing total solved challenges</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="tag_value" />
            <PolarGrid />
            <Radar
              dataKey="solves"
              fill="var(--color-solves)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
