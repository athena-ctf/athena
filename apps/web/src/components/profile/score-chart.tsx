import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/chart";
import type { components } from "@repo/api";

type PointRecords = components["schemas"]["PlayerProfile"]["history"];

type ProcessedDataPoint = {
  timestamp: number;
  datetime: string;
  pointsChange: number;
  cumulativePoints: number;
};

const chartConfig = {
  score: {
    label: "Score",
  },
} satisfies ChartConfig;

export function ScoreChart({ data }: { data: PointRecords }) {
  const [pointsData, setPointsData] = useState<ProcessedDataPoint[]>([]);

  const processPointsData = useCallback((data: PointRecords): ProcessedDataPoint[] => {
    let cumulativePoints = 0;
    return data
      .sort((a, b) => a.timestamp - b.timestamp)
      .map(({ timestamp, points }) => {
        cumulativePoints += points;
        return {
          timestamp,
          datetime: format(new Date(timestamp), "HH:mm:ss"),
          pointsChange: points,
          cumulativePoints,
        };
      });
  }, []);

  useEffect(() => {
    setPointsData(processPointsData(data));
  }, [data, processPointsData]);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Points Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <LineChart data={pointsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="datetime" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                labelFormatter={(label) => `Time: ${label}`}
                formatter={(value: number) => `${value} points`}
              />
              <Line type="monotone" dataKey="cumulativePoints" stroke="#16a34a" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
