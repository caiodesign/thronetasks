"use client";

import ActivityCardTable from "./presentations/ActivityCardTable";
import HomeHeader from "./presentations/Header";
import HomeCharts from "./presentations/Charts";

export default function HomeContainer() {
  return (
    <>
      <HomeHeader />
      <HomeCharts />
      <div className="w-full flex justify-between">
        <ActivityCardTable type="daily">
          We have selected some important daily tasks that you may want to
          consider.
        </ActivityCardTable>
        <ActivityCardTable type="weekly">
          We have also selected some key weekly tasks that you may find useful.
        </ActivityCardTable>
      </div>
    </>
  );
}
