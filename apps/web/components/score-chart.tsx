// "use client";

// import { Card, CardContent } from "@ui/components/ui/card";
// import {
//   CartesianGrid,
//   Tooltip as ChartTooltip,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from "recharts";

// interface ScoreChartProps {
//   details: {
//     dates: string;
//     rank1: number;
//     rank2: number;
//     rank3: number;
//     rank4: number;
//     rank5: number;
//     rank6: number;
//     rank7: number;
//     rank8: number;
//     rank9: number;
//     rank10: number;
//   }[];
//   names: string[];
// }

// const colors = [
//   "#a6bc07",
//   "#e563ea",
//   "#da9c71",
//   "#e264a3",
//   "#ef5603",
//   "#955f64",
//   "#1bac61",
//   "#03d20a",
//   "#f5d777",
//   "#21c8ec",
// ];

// export function ScoreChart({ details, names }: ScoreChartProps) {
//   return (
//     <Card className="pt-4">
//       <CardContent>
//         <ResponsiveContainer width={"100%"} height={250}>
//           <LineChart
//             data={details}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="dates" />
//             <YAxis />
//             <ChartTooltip />
//             <Legend
//               layout="vertical"
//               verticalAlign="top"
//               align="right"
//               wrapperStyle={{
//                 paddingLeft: "50px",
//               }}
//             />
//             {[...Array(10)].map((val) => (
//               <Line
//                 name={names[val]}
//                 key={val}
//                 type="monotone"
//                 dataKey={`rank${val + 1}`}
//                 stroke={colors[val]}
//                 activeDot={{ r: 8 }}
//               />
//             ))}
//           </LineChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@ui/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/components/ui/chart";
interface ScoreChartProps {
  details: {
    dates: string;
    rank1: number;
    rank2: number;
    rank3: number;
    rank4: number;
    rank5: number;
    rank6: number;
    rank7: number;
    rank8: number;
    rank9: number;
    rank10: number;
  }[];
  names: string[];
}

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

export function ScoreChart({ details, names }: ScoreChartProps) {
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
