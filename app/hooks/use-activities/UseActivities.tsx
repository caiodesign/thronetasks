"use client";

import { useState, useEffect } from "react";
import { IActivity } from "@/types/activity";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "@/lib/localstorage-helper";

const ACTIVITIES_KEY = "activities";

// Resets specific types of tasks by setting `done` to false
const resetTasks = (activities: IActivity[], type: IActivity["type"]) => {
  return activities.map((activity) =>
    activity.type === type ? { ...activity, done: false } : activity
  );
};

export default function useActivities(initialActivities: IActivity[]) {
  const [activities, setActivities] = useState<IActivity[]>(
    loadFromLocalStorage(ACTIVITIES_KEY) || initialActivities
  );

  // Save activities to localStorage whenever they are updated
  const saveActivities = (updatedActivities: IActivity[]) => {
    saveToLocalStorage(ACTIVITIES_KEY, updatedActivities);
    setActivities(updatedActivities);
  };

  // Toggle the 'done' state of a specific activity
  const toggleActivityDone = (id: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, done: !activity.done } : activity
    );
    saveActivities(updatedActivities);
  };

  // Update a specific activity's properties
  const updateActivity = (id: string, updates: Partial<IActivity>) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, ...updates } : activity
    );
    saveActivities(updatedActivities);
  };

  // Add a new activity
  const addActivity = (newActivity: IActivity) => {
    const updatedActivities = [...activities, newActivity];
    saveActivities(updatedActivities);
  };

  // Remove an activity
  const removeActivity = (id: string) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    saveActivities(updatedActivities);
  };

  // Filter activities by type
  const filterActivitiesByType = (type: IActivity["type"]) => {
    return activities.filter((activity) => activity.type === type);
  };

  // Toggle the 'done' state for all activities of a specific type
  const toggleAllByType = (type: IActivity["type"], done: boolean) => {
    const updatedActivities = activities.map((activity) =>
      activity.type === type ? { ...activity, done } : activity
    );
    saveActivities(updatedActivities);
  };

  // Reset daily and weekly tasks at specific times
  useEffect(() => {
    const now = new Date();

    // Calculate the next reset times for daily and weekly tasks
    const nextDailyReset = new Date();
    nextDailyReset.setHours(3, 0, 0, 0);
    if (now >= nextDailyReset)
      nextDailyReset.setDate(nextDailyReset.getDate() + 1);

    const nextWeeklyReset = new Date();
    nextWeeklyReset.setHours(3, 0, 0, 0);
    nextWeeklyReset.setDate(
      nextWeeklyReset.getDate() + ((8 - nextWeeklyReset.getDay()) % 7)
    );

    // Calculate the time until the next resets
    const dailyTimeout = nextDailyReset.getTime() - now.getTime();
    const weeklyTimeout = nextWeeklyReset.getTime() - now.getTime();

    // Set timers to reset tasks
    const dailyTimer = setTimeout(() => {
      const updatedActivities = resetTasks(activities, "daily");
      saveActivities(updatedActivities);
    }, dailyTimeout);

    const weeklyTimer = setTimeout(() => {
      const updatedActivities = resetTasks(activities, "weekly");
      saveActivities(updatedActivities);
    }, weeklyTimeout);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(dailyTimer);
      clearTimeout(weeklyTimer);
    };
  }, [activities]);

  return {
    activities,
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
    toggleAllByType,
  };
}
