// interface UserScoreChartProps {
//     data: {
//         date: string;
//         score: number;
//     }[];
// }

// export function UserScoreChart({ data }: UserScoreChartProps) {
//   return (
//     <Card>
//       <CardContent>
//         <ResponsiveContainer width={"95%"} height={300}>
//           <LineChart
//             className=""
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <ChartTooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="score"
//               stroke="#8884d8"
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@repo/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/chart";
interface UserScoreChartProps {
  data: {
    date: string;
    score: number;
  }[];
}
const chartConfig = {
  score: {
    label: "Score",
    color: "#8884d8",
  },
} satisfies ChartConfig;

export function UserScoreChart({ data }: UserScoreChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line
              dataKey="score"
              type="natural"
              stroke="var(--color-score)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total solved challenges</div>
      </CardFooter>
    </Card>
  );
}
