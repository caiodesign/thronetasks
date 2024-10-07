"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { IActivity } from "@/types/activity";
import { IActivitiesProps } from "@/types/components/activities-table";

export default function ActivitiesTable({
  activities,
  onToggleAll,
  onActivityToggle,
}: IActivitiesProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleAll = () => {
    if (selectedActivities.length === activities.length) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities(activities.map((activity) => activity.id));
    }

    onToggleAll();
  };

  const toggleActivity = (id: string) => {
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    onActivityToggle(id);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">
            <Checkbox
              checked={selectedActivities.length === activities.length}
              onCheckedChange={toggleAll}
              aria-label="Select all"
            />
          </TableHead>
          <TableHead className="w-1/4">Task</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.map((activity: IActivity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <Checkbox
                checked={selectedActivities.includes(activity.id)}
                onCheckedChange={() => toggleActivity(activity.id)}
                aria-label={`Select activity ${activity.id}`}
              />
            </TableCell>
            <TableCell className="font-medium">{activity.title}</TableCell>
            <TableCell>{activity.description}</TableCell>
            <TableCell className="text-right">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => toggleActivity(activity.id)}
              >
                {activity.done ? "done" : "pending"}
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
