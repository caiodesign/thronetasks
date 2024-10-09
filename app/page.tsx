"use client";

import { useEffect, useState } from "react";
import HomeContainer from "@/app/containers/home";
import { IActivity } from "@/types/activity";
import { ActivitiesProvider } from "@/app/hooks/use-activities/activitiesContext";
import data from "@/activities.json";
import { loadFromLocalStorage } from "@/lib/localstorage-helper";
import { ACTIVITIES_KEY } from "./constants/activities";

export default function Home() {
  const [activities, setActivities] = useState();

  //For preventing server X client errors
  useEffect(() => {
    setActivities(loadFromLocalStorage(ACTIVITIES_KEY) || data);
  }, []);

  return activities ? (
    <div className="container mx-auto">
      <ActivitiesProvider initialActivities={activities as IActivity[]}>
        <HomeContainer />
      </ActivitiesProvider>
    </div>
  ) : null;
}
