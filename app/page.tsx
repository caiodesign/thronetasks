import HomeContainer from "@/app/containers/home";
import { IActivity } from "@/types/activity";
import { ActivitiesProvider } from "./hooks/use-activities/ActivitiesContext";
import data from "@/activities.json";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="py-10">
        <ActivitiesProvider initialActivities={data as IActivity[]}>
          <HomeContainer />
        </ActivitiesProvider>
      </div>
    </div>
  );
}
