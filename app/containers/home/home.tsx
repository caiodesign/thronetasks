"use client";

import { useActivitiesContext } from "@/app/hooks/use-activities/activitiesContext";
import ActivityCardTable from "./presentations/ActivityCardTable";
import HomeHeader from "./presentations/Header";
import HomeDashboard from "./presentations/Dashboard";
import HomeFooter from "./presentations/Footer";
import { IActivity } from "@/types/activity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { randomId } from "@/lib/utils";

export default function HomeContainer() {
  const {
    toggleActivityDone,
    filterActivitiesByType,
    toggleAllByType,
    chartData,
    getTotalTasksDone,
    getWeeklyTasksDone,
    getLastWeeklyTasksDone,
    addActivity,
    removeActivity,
  } = useActivitiesContext();

  const dailyActivities = filterActivitiesByType("daily");
  const weeklyActivities = filterActivitiesByType("weekly");

  function onToggleAll(type: IActivity["type"], allSelected: boolean) {
    toggleAllByType(type, allSelected);
  }

  function onRemove(id: string) {
    removeActivity(id);
  }

  function onSubmit(
    event: React.FormEvent<HTMLFormElement>,
    type: IActivity["type"]
  ) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const taskInput = form.task as HTMLInputElement;

    addActivity({
      type,
      id: randomId(),
      title: taskInput.value,
      description: "custom activity",
      custom: true,
      done: false,
    });

    taskInput.value = "";
  }

  return (
    <div className="mb-12">
      <HomeHeader />
      <div className="m-3 md:flex md:m-0">
        <div className="w-full mb-3 md:w-2/4 md:mr-3 md:mb-0">
          <Tabs defaultValue="daily">
            <TabsList className="grid w-full grid-cols-2 md:mx-2">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <ActivityCardTable
                className="mb-3"
                activities={dailyActivities}
                type="daily"
                onToggle={(id) => toggleActivityDone(id)}
                onToggleAll={onToggleAll}
                onSubmit={onSubmit}
                onRemove={onRemove}
              >
                We have selected some important daily tasks that you may want to
                consider.
              </ActivityCardTable>
            </TabsContent>
            <TabsContent value="weekly">
              <ActivityCardTable
                activities={weeklyActivities}
                type="weekly"
                onToggle={(id) => toggleActivityDone(id)}
                onToggleAll={onToggleAll}
                onSubmit={onSubmit}
                onRemove={onRemove}
              >
                We have also selected some key weekly tasks that you may find
                useful.
              </ActivityCardTable>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-2/4">
          <div className="w-3/3 md:ml-2">
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
