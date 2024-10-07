export type IActivity = {
  id: string;
  type: "daily" | "weekly" | "challenge" | "custom";
  title: string;
  description?: string;
  done?: boolean;
};
