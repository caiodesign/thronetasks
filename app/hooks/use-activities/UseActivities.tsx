/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { IActivity } from "@/types/activity";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/localstorage-helper";

const ACTIVITIES_KEY = "activities";
const CHART_DATA_KEY = "chartData";
const TOTAL_DONE_KEY = "totalTasksDone";
const TOTAL_LAST_WEEKLY_DONE_KEY = "totalLastWeeklyTasksDone";

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

  const [totalTasksDone, setTotalTasksDone] = useState(
    loadFromLocalStorage(TOTAL_DONE_KEY) || 0
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updatedChartData = chartData.map((entry: any) =>
      entry.day === today
        ? { ...entry, daily: dailyCount, weekly: weeklyCount }
        : entry
    );

    saveChartData(updatedChartData);
  };

  const incrementTaskCounters = () => {
    setTotalTasksDone((prevTotal: number) => {
      const newTotal = prevTotal + 1;
      saveToLocalStorage(TOTAL_DONE_KEY, newTotal);
      return newTotal;
    });
  };

  const decreaseTaskCounters = () => {
    setTotalTasksDone((prevTotal: number) => {
      const newTotal = prevTotal - 1;
      saveToLocalStorage(TOTAL_DONE_KEY, newTotal);
      return newTotal;
    });
  };

  const toggleActivityDone = (id: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, done: !activity.done } : activity
    );

    // Increment counters if task is marked as done
    const toggledActivity = updatedActivities.find(
      (activity) => activity.id === id
    );

    if (toggledActivity && toggledActivity.done) {
      incrementTaskCounters();
    } else {
      decreaseTaskCounters();
    }

    saveActivities(updatedActivities);
  };

  const updateWeeklyDone = () => {
    const thisWeekDone = activities.filter((activity) => activity.done).length;
    saveToLocalStorage(TOTAL_LAST_WEEKLY_DONE_KEY, thisWeekDone);
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

  const getTotalTasksDone = () => {
    return loadFromLocalStorage(TOTAL_DONE_KEY);
  };

  const getWeeklyTasksDone = () => {
    return activities.filter((activity) => activity.done).length;
  };

  const getLastWeeklyTasksDone = () => {
    return loadFromLocalStorage(TOTAL_LAST_WEEKLY_DONE_KEY);
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
      updateWeeklyDone();
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
    totalTasksDone,
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
    toggleAllByType,
    getTotalTasksDone,
    getWeeklyTasksDone,
    getLastWeeklyTasksDone,
  };
}
