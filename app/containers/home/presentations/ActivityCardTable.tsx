"use client";

import ActivitiesTable from "@/components/ActivitiesTable";
import { IActivity } from "@/types/activity";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  onSubmit,
  onRemove,
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
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    type: IActivity["type"]
  ) => void;
  onRemove: (id: string) => void;
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
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
                {type}
              </h3>
              <CardDescription className="text-sm md:text-md">
                {children}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ActivitiesTable
            activities={activities}
            onToggleAll={toggleAll}
            onActivityToggle={toggleAcitivity}
            onRemove={onRemove}
          />
          <form className="flex mt-3" onSubmit={(e) => onSubmit(e, type)}>
            <Input
              className="w-full mr-3"
              placeholder={`Type here to add a new custom ${type} task.`}
              name="task"
              maxLength={45}
            />
            <Button type="submit">submit {type}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
