import React from "react";
import DashboardStat from "../components/DashboardStat";
import UploadMaster from "../components/UploadMaster";
import { RecentPageComp } from "../components/RecentPageComp";

export default function DashboardPages() {
  return (
    <div>
      <div className="flex gap-4">
        <DashboardStat />
      </div>
      <div className="flex mt-7">
        <UploadMaster option="tes"/>
      </div>
      <div className=" flex-1 mt-7">
        <RecentPageComp />
      </div>
    </div>
  );
}
