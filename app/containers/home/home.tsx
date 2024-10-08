"use client";

import ActivityCardTable from "./presentations/ActivityCardTable";
import HomeHeader from "./presentations/Header";
import HomeCharts from "./presentations/Charts";

export default function HomeContainer() {
  return (
    <>
      <HomeHeader />
      <div className="w-full flex justify-between">
        <ActivityCardTable type="daily">
          We have selected some important daily tasks that you may want to
          consider.
        </ActivityCardTable>
        <div className="w-full">
          <ActivityCardTable type="weekly">
            We have also selected some key weekly tasks that you may find
            useful.
          </ActivityCardTable>
          <div className="w-2/3 mt-3 ml-2">
            <HomeCharts />
          </div>
        </div>
      </div>
    </>
  );
}
