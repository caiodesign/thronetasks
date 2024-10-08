"use client";

import ActivitiesTable from "@/components/ActivitiesTable";
import { IActivity } from "@/types/activity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { useActivitiesContext } from "@/app/hooks/use-activities/ActivitiesContext";

export default function ActivityCardTable({
  type,
  children,
}: {
  type: IActivity["type"];
  children: React.ReactNode;
}) {
  const { activities, toggleActivityDone, toggleAllByType } =
    useActivitiesContext();

  function onToggleAll(type: IActivity["type"]) {
    const allSelected = activities
      .filter((activity) => activity.type === type)
      .every((activity) => activity.done);

    toggleAllByType(type, !allSelected);
  }

  function onActivityToggle(id: string) {
    toggleActivityDone(id);
  }

  return (
    <div className="w-full mx-2 ">
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-3xl font-bold leading-tight tracking-tighter md:text-3xl">
              {type}
            </h3>
          </div>
          <CardDescription>{children}</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivitiesTable
            activities={activities.filter((act) => act.type == type)}
            onToggleAll={() => onToggleAll(type)}
            onActivityToggle={onActivityToggle}
          />
        </CardContent>
      </Card>
    </div>
  );
}
