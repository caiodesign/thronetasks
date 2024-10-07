import { IActivity } from "../activity";

export type IActivitiesProps = {
  activities: IActivity[];
  onToggleAll: () => void;
  onActivityToggle: (id: string) => void;
};
