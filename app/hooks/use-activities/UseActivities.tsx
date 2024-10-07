"use client";

import { useState } from "react";
import { IActivity } from "@/types/activity";

export default function useActivities(initialActivities: IActivity[]) {
  const [activities, setActivities] = useState<IActivity[]>(initialActivities);

  // Function to toggle the 'done' state of a specific activity
  const toggleActivityDone = (id: string) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, done: !activity.done } : activity
      )
    );
  };

  // Function to update a specific activity's properties
  const updateActivity = (id: string, updates: Partial<IActivity>) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  // Function to add a new activity
  const addActivity = (newActivity: IActivity) => {
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  // Function to remove an activity
  const removeActivity = (id: string) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  // Function to filter activities by type
  const filterActivitiesByType = (type: IActivity["type"]) => {
    return activities.filter((activity) => activity.type === type);
  };

  return {
    activities,
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
  };
}
