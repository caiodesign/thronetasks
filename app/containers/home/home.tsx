"use client";

import { useActivitiesContext } from "@/app/hooks/use-activities/activitiesContext";
import ActivityCardTable from "./presentations/ActivityCardTable";
import HomeHeader from "./presentations/Header";
import HomeDashboard from "./presentations/Dashboard";
import HomeFooter from "./presentations/Footer";
import { IActivity } from "@/types/activity";

export default function HomeContainer() {
  const {
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
    toggleAllByType,
    chartData,
    getTotalTasksDone,
    getWeeklyTasksDone,
    getLastWeeklyTasksDone,
  } = useActivitiesContext();

  const dailyActivities = filterActivitiesByType("daily");
  const weeklyActivities = filterActivitiesByType("weekly");

  function onToggleAll(type: IActivity["type"], allSelected: boolean) {
    toggleAllByType(type, allSelected);
  }

  return (
    <div className="mb-12">
      <HomeHeader />
      <div className="flex">
        <div className="w-2/4 mr-3">
          <ActivityCardTable
            className="mb-3"
            activities={dailyActivities}
            type="daily"
            onToggle={(id) => toggleActivityDone(id)}
            onToggleAll={onToggleAll}
          >
            We have selected some important daily tasks that you may want to
            consider.
          </ActivityCardTable>
          <ActivityCardTable
            activities={weeklyActivities}
            type="weekly"
            onToggle={(id) => toggleActivityDone(id)}
            onToggleAll={onToggleAll}
          >
            We have also selected some key weekly tasks that you may find
            useful.
          </ActivityCardTable>
        </div>

        <div className="w-2/4">
          <div className="w-3/3 ml-2">
            <HomeDashboard
              chartData={chartData}
              totalTasksDone={getTotalTasksDone()}
              weeklyTasksDone={getWeeklyTasksDone()}
              lastWeeklyTasksDone={getLastWeeklyTasksDone()}
            />
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
