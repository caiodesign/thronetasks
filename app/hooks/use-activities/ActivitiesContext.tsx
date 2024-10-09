"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { IActivity } from "@/types/activity";
import { IActivityChart } from "@/types/components/activity-chart";
import useActivities from "./";

interface ActivitiesContextType {
  activities: IActivity[];
  chartData: IActivityChart[];
  totalTasksDone: number;
  toggleActivityDone: (id: string) => void;
  updateActivity: (id: string, updates: Partial<IActivity>) => void;
  addActivity: (newActivity: IActivity) => void;
  removeActivity: (id: string) => void;
  filterActivitiesByType: (type: IActivity["type"]) => IActivity[];
  toggleAllByType: (type: IActivity["type"], done: boolean) => void;
  getTotalTasksDone: () => number;
  getWeeklyTasksDone: () => number;
  getLastWeeklyTasksDone: () => number;
}

const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

interface ActivitiesProviderProps {
  children: ReactNode;
  initialActivities: IActivity[];
}

export const ActivitiesProvider = ({
  children,
  initialActivities,
}: ActivitiesProviderProps) => {
  const {
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
  } = useActivities(initialActivities);

  return (
    <ActivitiesContext.Provider
      value={{
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
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      "useActivitiesContext must be used within an ActivitiesProvider"
    );
  }
  return context;
};
