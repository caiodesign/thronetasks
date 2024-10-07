"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { IActivity } from "@/types/activity";
import useActivities from "./UseActivities";

// Define the type for our context
interface ActivitiesContextType {
  activities: IActivity[];
  toggleActivityDone: (id: string) => void;
  updateActivity: (id: string, updates: Partial<IActivity>) => void;
  addActivity: (newActivity: IActivity) => void;
  removeActivity: (id: string) => void;
  filterActivitiesByType: (type: IActivity["type"]) => IActivity[];
}

// Initialize the context with an undefined default value
const ActivitiesContext = createContext<ActivitiesContextType | undefined>(
  undefined
);

// Create the provider component
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
    toggleActivityDone,
    updateActivity,
    addActivity,
    removeActivity,
    filterActivitiesByType,
  } = useActivities(initialActivities);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        toggleActivityDone,
        updateActivity,
        addActivity,
        removeActivity,
        filterActivitiesByType,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};

// Custom hook to use the activities context
export const useActivitiesContext = () => {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error(
      "useActivitiesContext must be used within an ActivitiesProvider"
    );
  }
  return context;
};
