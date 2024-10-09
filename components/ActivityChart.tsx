"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IActivityChart } from "@/types/components/activity-chart";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export function ActivityChart({ data }: IActivityChart) {
  return (
    <Card className="w-full">
      <CardHeader>
        <h3 className="text-xl font-bold leading-tight tracking-tighter md:text-md">
          Weekly Activity Overview
        </h3>
        <CardDescription>
          A comparison of daily and weekly activity levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            daily: {
              label: "Daily Activity",
              color: "hsl(var(--primary))",
            },
            weekly: {
              label: "Weekly Activity",
              color: "#d1d1d1",
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={20}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#000"
                opacity={0.15}
              />
              <XAxis
                dataKey="day"
                stroke="#d1d1d1"
                tick={{ fill: "#d1d1d1" }}
                tickFormatter={(value) =>
                  value.charAt(0).toUpperCase() + value.slice(1)
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                formatter={(value) => <span>{value}</span>}
              />
              <Bar
                dataKey="daily"
                fill="var(--color-daily)"
                name="Daily Activity"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="weekly"
                fill="var(--color-weekly)"
                name="Weekly Activity"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
