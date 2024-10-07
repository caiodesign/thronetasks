"use client";

import { useActivitiesContext } from "@/app/hooks/use-activities/ActivitiesContext";
import ActivitiesTable from "@/components/ActivitiesTable";

export default function HomeContainer() {
  const { activities, toggleActivityDone } = useActivitiesContext();

  function onToggleAll() {}

  function onActivityToggle(id: string) {
    toggleActivityDone(id);
  }

  const daily = activities.filter((act) => act.type == "daily");
  const weekly = activities.filter((act) => act.type == "weekly");
  const challenges = activities.filter((act) => act.type == "challenge");

  return (
    <div>
      <div>daily</div>
      <ActivitiesTable
        activities={daily}
        onToggleAll={onToggleAll}
        onActivityToggle={onActivityToggle}
      />
      <div>weekly</div>
      <ActivitiesTable
        activities={weekly}
        onToggleAll={onToggleAll}
        onActivityToggle={onActivityToggle}
      />
      <div>challenges</div>
      <ActivitiesTable
        activities={challenges}
        onToggleAll={onToggleAll}
        onActivityToggle={onActivityToggle}
      />
    </div>
  );
}
