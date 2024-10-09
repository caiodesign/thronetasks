import { IActivityChart } from "./activity-chart";

export type IDashboard = {
  chartData: IActivityChart[];
  totalTasksDone: number;
  weeklyTasksDone: number;
  lastWeeklyTasksDone: number;
};
