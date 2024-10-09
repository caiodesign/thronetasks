"use client";

import ActivityCardTable from "./presentations/ActivityCardTable";
import HomeHeader from "./presentations/Header";
import HomeCharts from "./presentations/Charts";
import HomeFooter from "./presentations/Footer";

export default function HomeContainer() {
  return (
    <div className="mb-12">
      <HomeHeader />
      <div className="flex">
        <div className="w-2/4 mr-3">
          <ActivityCardTable type="daily" className="mb-3">
            We have selected some important daily tasks that you may want to
            consider.
          </ActivityCardTable>
          <ActivityCardTable type="weekly">
            We have also selected some key weekly tasks that you may find
            useful.
          </ActivityCardTable>
        </div>

        <div className="w-2/4">
          <div className="w-3/3 ml-2">
            <HomeCharts />
            <HomeFooter />
          </div>
        </div>
      </div>
    </div>
  );
}
