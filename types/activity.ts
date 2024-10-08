export type IActivity = {
  id: string;
  type: "daily" | "weekly";
  title: string;
  description?: string;
  done?: boolean;
};
