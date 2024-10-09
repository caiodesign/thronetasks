"use client";

import { useState, useEffect } from "react";
import { IActivity } from "@/types/activity";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/localstorage-helper";

const ACTIVITIES_KEY = "activities";
const CHART_DATA_KEY = "chartData";

const resetTasks = (activities: IActivity[], type: IActivity["type"]) => {
  return activities.map((activity) =>
    activity.type === type ? { ...activity, done: false } : activity
  );
};

export default function useActivities(initialActivities: IActivity[]) {
  const [activities, setActivities] = useState<IActivity[]>(
    loadFromLocalStorage(ACTIVITIES_KEY) || initialActivities
  );

  const defaultChartData = [
    { day: "monday", daily: 0, weekly: 0 },
    { day: "tuesday", daily: 0, weekly: 0 },
    { day: "wednesday", daily: 0, weekly: 0 },
    { day: "thursday", daily: 0, weekly: 0 },
    { day: "friday", daily: 0, weekly: 0 },
    { day: "saturday", daily: 0, weekly: 0 },
    { day: "sunday", daily: 0, weekly: 0 },
  ];

  const [chartData, setChartData] = useState(
    loadFromLocalStorage(CHART_DATA_KEY) || defaultChartData
  );

  const saveActivities = (updatedActivities: IActivity[]) => {
    saveToLocalStorage(ACTIVITIES_KEY, updatedActivities);
    setActivities(updatedActivities);
    updateChartData(updatedActivities);
  };

  const saveChartData = (updatedChartData: typeof defaultChartData) => {
    saveToLocalStorage(CHART_DATA_KEY, updatedChartData);
    setChartData(updatedChartData);
  };

  const updateChartData = (updatedActivities: IActivity[]) => {
    const today = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    const dailyCount = updatedActivities.filter(
      (activity) => activity.type === "daily" && activity.done
    ).length;

    const weeklyCount = updatedActivities.filter(
      (activity) => activity.type === "weekly" && activity.done
    ).length;

    const updatedChartData = chartData.map((entry) =>
      entry.day === today
        ? { ...entry, daily: dailyCount, weekly: weeklyCount }
        : entry
    );

    saveChartData(updatedChartData);
  };

  const toggleActivityDone = (id: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, done: !activity.done } : activity
    );
    saveActivities(updatedActivities);
  };

  const toggleAllByType = (type: IActivity["type"], done: boolean) => {
    const updatedActivities = activities.map((activity) =>
      activity.type === type ? { ...activity, done } : activity
    );
    saveActivities(updatedActivities);
  };

  const updateActivity = (id: string, updates: Partial<IActivity>) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, ...updates } : activity
    );
    saveActivities(updatedActivities);
  };

  const addActivity = (newActivity: IActivity) => {
    const updatedActivities = [...activities, newActivity];
    saveActivities(updatedActivities);
  };

  const removeActivity = (id: string) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    saveActivities(updatedActivities);
  };

  const filterActivitiesByType = (type: IActivity["type"]) => {
    return activities.filter((activity) => activity.type === type);
  };

  useEffect(() => {
    const now = new Date();
    const nextDailyReset = new Date();
    nextDailyReset.setHours(3, 0, 0, 0);
    if (now >= nextDailyReset)
      nextDailyReset.setDate(nextDailyReset.getDate() + 1);

    const nextWeeklyReset = new Date();
    nextWeeklyReset.setHours(3, 0, 0, 0);
    nextWeeklyReset.setDate(
      nextWeeklyReset.getDate() + ((8 - nextWeeklyReset.getDay()) % 7)
    );

    const dailyTimeout = nextDailyReset.getTime() - now.getTime();
    const weeklyTimeout = nextWeeklyReset.getTime() - now.getTime();

    const dailyTimer = setTimeout(() => {
      const updatedActivities = resetTasks(activities, "daily");
      saveActivities(updatedActivities);
    }, dailyTimeout);

    const weeklyTimer = setTimeout(() => {
      const updatedActivities = resetTasks(activities, "weekly");
      saveActivities(updatedActivities);
    }, weeklyTimeout);

    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(weeklyTimer);
    };
  }, [activities]);

  return {
    activities,
    chartData,
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
    toggleAllByType,
  };
}
