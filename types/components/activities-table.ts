import { IActivity } from "../activity";

export type IActivitiesProps = {
  activities: IActivity[];
  onToggleAll: (allSelected: boolean) => void;
  onActivityToggle: (id: string) => void;
};
