"use client";

import { ActivityChart } from "@/components/ActivityChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { calculateWeeklyChange } from "@/lib/dashboard";
import { IDashboard } from "@/types/components/dashboard";
import { MdAutoGraph } from "react-icons/md";

export default function Dashboard({
  chartData,
  totalTasksDone,
  weeklyTasksDone,
  lastWeeklyTasksDone,
}: IDashboard) {
  const weeklyPercentage = calculateWeeklyChange(
    lastWeeklyTasksDone,
    weeklyTasksDone
  );

  return (
    <>
      <div className="flex">
        <Card className="mb-3 w-full mr-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium tracking-tighter">Total</h4>
              <MdAutoGraph className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTasksDone}</p>
            <p className="text-xs text-muted-foreground">since october 2024</p>
          </CardContent>
        </Card>
        <Card className="mb-3 w-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium tracking-tighter">
                This week
              </h4>
              <MdAutoGraph className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{weeklyTasksDone}</p>
            <p className="text-xs text-muted-foreground">
              {weeklyPercentage}% from last week
            </p>
          </CardContent>
        </Card>
      </div>
      <ActivityChart chartData={chartData} />
    </>
  );
}
