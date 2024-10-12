/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import { IActivity } from "@/types/activity";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/localstorage-helper";

import {
  ACTIVITIES_KEY,
  CHART_DATA_KEY,
  TOTAL_DONE_KEY,
  TOTAL_LAST_WEEKLY_DONE_KEY,
  LAST_VISIT_KEY,
} from "@/app/constants/activities";

export default function useActivities(initialActivities: IActivity[]) {
  const [activities, setActivities] = useState<IActivity[]>(
    loadFromLocalStorage(ACTIVITIES_KEY) || initialActivities
  );

  const hasCheckedAndResetTasks = useRef(false); // Ref to track if the check has been done

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
    const updatedActivities = activities.map((activity) => {
      if (activity.type === type && activity.done !== done) {
        if (done) {
          incrementTaskCounters(); // Increment if marking as done
        } else {
          decreaseTaskCounters(); // Decrease if marking as undone
        }
        return { ...activity, done };
      }
      return activity;
    });

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

  const resetTasks = (activities: IActivity[], type: IActivity["type"]) => {
    return activities.map((activity) =>
      activity.type === type ? { ...activity, done: false } : activity
    );
  };

  const checkAndResetTasks = () => {
    if (hasCheckedAndResetTasks.current) return;
    hasCheckedAndResetTasks.current = true;

    const lastVisit = loadFromLocalStorage(LAST_VISIT_KEY);
    const now = new Date();
    const dailyStartHour = 6;
    const timezoneOffset = now.getTimezoneOffset() * 60000; // offset in milliseconds
    const localISOTime = new Date(now.getTime() - timezoneOffset)
      .toISOString()
      .slice(0, -1); // Remove 'Z' to indicate local time

    if (!lastVisit) {
      // If there's no last visit recorded, store the current time
      saveToLocalStorage(LAST_VISIT_KEY, localISOTime);
      return;
    }

    const lastVisitDate = new Date(lastVisit);

    const isNewDay = now.getDate() !== lastVisitDate.getDate();
    const isPastResetHour = now.getHours() >= dailyStartHour;

    let updatedActivities = [...activities];

    // Daily reset: If the day has changed and it's past 6:00 AM
    if (isNewDay && isPastResetHour) {
      updatedActivities = resetTasks(updatedActivities, "daily");
    }

    // Determine the start of the current week for the game (Wednesday at 6:00 AM)
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - ((now.getDay() + 4) % 7)); // Move to the previous Wednesday
    currentWeekStart.setHours(6, 0, 0, 0); // Set to 6:00 AM

    const lastWeekStart = new Date(lastVisitDate);
    lastWeekStart.setDate(
      lastVisitDate.getDate() - ((lastVisitDate.getDay() + 4) % 7)
    ); // Move to the previous Wednesday
    lastWeekStart.setHours(6, 0, 0, 0); // Set to 6:00 AM

    const isNewGameWeek =
      currentWeekStart > lastWeekStart && now >= currentWeekStart;

    // Weekly reset: If it is a new game week and the current time is past Wednesday 6:00 AM
    if (isNewGameWeek) {
      updateWeeklyDone();
      updatedActivities = resetTasks(updatedActivities, "weekly");
    }

    // Save the activities only once at the end if any resets occurred
    if ((isNewDay && isPastResetHour) || isNewGameWeek) {
      saveActivities(updatedActivities);
    }

    // Update last visit date after checking and resetting
    // saveToLocalStorage(LAST_VISIT_KEY, localISOTime);
  };

  useEffect(() => {
    checkAndResetTasks();
  }, []);

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
