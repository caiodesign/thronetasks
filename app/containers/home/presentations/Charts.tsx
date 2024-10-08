"use client";
import { ActivityChart } from "@/components/ActivityChart";

const chartData = [
  { day: "monday", daily: 9, weekly: 1 },
  { day: "tuesday", daily: 12, weekly: 2 },
  { day: "wednesday", daily: 4, weekly: 0 },
  { day: "thursday", daily: 8, weekly: 4 },
  { day: "friday", daily: 0, weekly: 1 },
  { day: "saturday", daily: 2, weekly: 0 },
  { day: "sunday", daily: 10, weekly: 5 },
];

export default function Chart() {
  return <ActivityChart data={chartData} />;
}
