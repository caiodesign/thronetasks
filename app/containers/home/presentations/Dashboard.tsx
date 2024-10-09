"use client";

import { ActivityChart } from "@/components/ActivityChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdAutoGraph } from "react-icons/md";

export default function Dashboard({ chartData }: any) {
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
