// "use client";

// import type { components } from "@repo/api";
// import { Card, CardContent } from "@ui/components/ui/card";
// import {
//   PolarAngleAxis,
//   PolarGrid,
//   Radar,
//   RadarChart,
//   ResponsiveContainer,
// } from "recharts";

// type Data = {
//   data: components["schemas"]["PlayerProfile"]["tag_solves"];
// };

// export function UserChallengeDiff({ data }: Data) {
//   return (
//     <Card>
//       <CardContent>
//         <ResponsiveContainer width={"95%"} height={300}>
//           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//             <PolarGrid />
//             <PolarAngleAxis dataKey="tag_value" />
//             <Radar
//               name="Mike"
//               dataKey="solves"
//               stroke="#8884d8"
//               fill="#8884d8"
//               fillOpacity={0.6}
//             />
//           </RadarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/components/ui/chart";
import type { components } from "@repo/api";
type Data = {
  data: components["schemas"]["PlayerProfile"]["tag_solves"];
};

const chartConfig = {
  solves: {
    label: "Solves",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function UserChallengeDiff({ data }: Data) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardDescription>Showing total solved challenges</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="tag" />
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
