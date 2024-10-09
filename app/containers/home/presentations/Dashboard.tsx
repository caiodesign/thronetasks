"use client";

import { ActivityChart } from "@/components/ActivityChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { calculateWeeklyChange } from "@/lib/dashboard";
import { IDashboard } from "@/types/components/dashboard";
import { MdAutoGraph } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

const encouragementPhrases = [
  "Well done!",
  "Nice work!",
  "Great effort!",
  "Keep it up!",
  "Awesome job!",
  "Fantastic work!",
  "You’re doing amazing!",
  "Way to go!",
  "Impressive!",
  "Excellent progress!",
  "You nailed it!",
  "That's the way to do it!",
  "Outstanding!",
  "Keep crushing it!",
  "You’re on the right track!",
  "Brilliant work!",
  "That’s the spirit!",
  "You’ve got this!",
  "Rock on!",
  "You’re making great strides!",
];

function getRandomPhrase(phrases: string[]) {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
}

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
        <Card className="mb-3 w-full md:mr-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium tracking-tighter">Total</h4>
              <IoMdDoneAll className="text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalTasksDone || 0}</p>
            <p className="text-xs text-muted-foreground">
              {totalTasksDone
                ? getRandomPhrase(encouragementPhrases)
                : "complete a task to start"}
            </p>
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
