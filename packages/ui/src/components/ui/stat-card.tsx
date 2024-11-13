import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card";
// biome-ignore lint/style/useImportType: <explanation>
import React from "react";

interface StatCardProps {
  title: string;
  icon: React.ReactNode;
  stat: number;
}

export default function StatCard({ title, icon, stat }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{stat}</div>
      </CardContent>
    </Card>
  );
}
