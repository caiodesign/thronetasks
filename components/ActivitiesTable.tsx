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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { IActivity } from "@/types/activity";
import { InfoIcon } from "lucide-react";
import { IActivitiesProps } from "@/types/components/activities-table";

export default function ActivitiesTable({
  activities,
  onToggleAll,
  onActivityToggle,
}: IActivitiesProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const toggleAll = () => {
    const allSelected = selectedActivities.length === activities.length;

    setSelectedActivities(
      allSelected ? [] : activities.map((activity) => activity.id)
    );
    onToggleAll(!allSelected);
  };

  const toggleActivity = (id: string) => {
    console.log(id);
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    onActivityToggle(id);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selectedActivities.length === activities.length}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Task</TableHead>
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

              <TableCell className="font-medium">
                {activity.title}
                <Tooltip>
                  <TooltipTrigger className="h-full align-middle">
                    <InfoIcon
                      className="mx-2 h-4 w-4 text-muted-foreground opacity-30 hover:opacity-100 transition-opacity duration-200"
                      fontSize={14}
                    />
                  </TooltipTrigger>

                  <TooltipContent>{activity.description}</TooltipContent>
                </Tooltip>
              </TableCell>

              <TableCell className="text-right pl-0">
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
    </TooltipProvider>
  );
}
