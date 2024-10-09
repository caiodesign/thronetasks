import HomeContainer from "@/app/containers/home";
import { IActivity } from "@/types/activity";
import { ActivitiesProvider } from "./hooks/use-activities/activitiesContext";
import data from "@/activities.json";

export default function Home() {
  return (
    <div className="container mx-auto">
      <ActivitiesProvider initialActivities={data as IActivity[]}>
        <HomeContainer />
      </ActivitiesProvider>
    </div>
  );
}
