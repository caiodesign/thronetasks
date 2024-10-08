"use client";

import { useActivitiesContext } from "@/app/hooks/use-activities/ActivitiesContext";
import ActivitiesTable from "@/components/ActivitiesTable";
import { IActivity } from "@/types/activity";

export default function HomeContainer() {
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

  function getUniqueTypes(dataArray: IActivity[]) {
    const types = dataArray.map((item) => item.type);
    return [...new Set(types)];
  }

  function renderActivitiesTables() {
    const activitiesTypes = getUniqueTypes(activities);

    return activitiesTypes.map((activity) => (
      <div className="pt-4  mx-2 w-full" key={activity}>
        <div className="capitalize">{activity}</div>
        <ActivitiesTable
          activities={activities.filter((act) => act.type == activity)}
          onToggleAll={() => onToggleAll(activity)}
          onActivityToggle={onActivityToggle}
        />
      </div>
    ));
  }

  return (
    <div className="w-full flex justify-between">
      {renderActivitiesTables()}
    </div>
  );
}
