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
import { Badge } from "@/components/ui/badge";

export default function ActivitiesTable({
  activities,
  onToggleAll,
  onActivityToggle,
  onRemove,
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
    setSelectedActivities((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

    onActivityToggle(id);
  };

  function areAllActivitiesDone() {
    return activities.every((activity) => activity.done);
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={areAllActivitiesDone()}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead className="capitalize px-2 text-left align-middle font-medium text-muted-foreground ">
              task
            </TableHead>
            <TableHead className="text-center capitalize px-2 align-middle font-medium text-muted-foreground w-[30px]">
              status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity: IActivity) => (
            <TableRow
              key={activity.id}
              className={`h-[54px] ${activity.done && "bg-secondary"}`}
            >
              <TableCell>
                <Checkbox
                  checked={activity.done}
                  onCheckedChange={() => toggleActivity(activity.id)}
                  aria-label={`Select activity ${activity.id}`}
                />
              </TableCell>

              <TableCell className="font-medium">
                <span className="text-xs md:text-sm">{activity.title}</span>
                {activity.custom ? (
                  <button onClick={() => onRemove(activity.id)}>
                    <Badge
                      variant="outline"
                      className="ml-2 cursor-pointer transition-text duration-200 hover:bg-primary hover:text-secondary"
                    >
                      delete
                    </Badge>
                  </button>
                ) : (
                  <Tooltip>
                    <TooltipTrigger className="h-full align-middle">
                      <InfoIcon
                        className="hidden sm:block mx-2 h-4 w-4 text-muted-foreground opacity-80 hover:opacity-100 transition-opacity duration-200"
                        fontSize={14}
                      />
                    </TooltipTrigger>

                    <TooltipContent>{activity.description}</TooltipContent>
                  </Tooltip>
                )}
              </TableCell>

              <TableCell className="text-center px-0">
                <button onClick={() => toggleActivity(activity.id)}>
                  {activity.done ? (
                    <Badge className="text-2xs">done</Badge>
                  ) : (
                    <>
                      <Badge variant="outline" className="hidden md:block">
                        pending
                      </Badge>
                      <Badge variant="outline" className="md:hidden">
                        pend.
                      </Badge>
                    </>
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
