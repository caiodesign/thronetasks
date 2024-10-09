"use client";

import ActivitiesTable from "@/components/ActivitiesTable";
import { IActivity } from "@/types/activity";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

export default function ActivityCardTable({
  activities,
  onToggle,
  onToggleAll,
  type,
  children,
  className,
}: {
  activities: IActivity[];
  onToggle: (id: IActivity["id"]) => void;
  onToggleAll: (type: IActivity["type"], allSelected: boolean) => void;
  type: IActivity["type"];
  children?: React.ReactNode;
  className?: string;
}) {
  function toggleAll() {
    const allSelected = activities
      .filter((activity) => activity.type === type)
      .every((activity) => activity.done);

    onToggleAll(type, !allSelected);
  }

  function toggleAcitivity(id: string) {
    onToggle(id);
  }

  return (
    <div className={`w-full md:mx-2 ${className}`}>
      <Card>
        <CardHeader>
          <div>
            <h3 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
              {type}
            </h3>
          </div>
          <CardDescription className="text-sm md:text-md">
            {children}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ActivitiesTable
            activities={activities}
            onToggleAll={toggleAll}
            onActivityToggle={toggleAcitivity}
          />
        </CardContent>
      </Card>
    </div>
  );
}
