"use client";
import { ActivityChart } from "@/components/ActivityChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdAutoGraph } from "react-icons/md";

const chartData = [
  { day: "monday", daily: 9, weekly: 1 },
  { day: "tuesday", daily: 12, weekly: 2 },
  { day: "wednesday", daily: 4, weekly: 0 },
  { day: "thursday", daily: 8, weekly: 4 },
  { day: "friday", daily: 0, weekly: 1 },
  { day: "saturday", daily: 2, weekly: 0 },
  { day: "sunday", daily: 10, weekly: 5 },
];

export default function Chart() {
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
            <p className="text-2xl font-bold">300</p>
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
            <p className="text-2xl font-bold">+13</p>
            <p className="text-xs text-muted-foreground">100% from last week</p>
          </CardContent>
        </Card>
      </div>
      <ActivityChart data={chartData} />
    </>
  );
}
