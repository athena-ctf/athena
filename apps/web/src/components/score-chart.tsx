import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import type { components } from "@repo/api";

const colors = [
  "#a6bc07",
  "#e563ea",
  "#da9c71",
  "#e264a3",
  "#ef5603",
  "#955f64",
  "#1bac61",
  "#03d20a",
  "#f5d777",
  "#21c8ec",
];

const chartConfig = {} satisfies ChartConfig;

export function ScoreChart({
  details,
  names,
}: components["schemas"]["LeaderboardModel"]) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={details}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="dates" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {[...Array(10)].map((val) => (
              <Line
                name={names[val]}
                key={val}
                type="monotone"
                dataKey={`rank${val + 1}`}
                stroke={colors[val]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing solved challenges
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
