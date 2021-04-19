import React from "react";
import DashboardCard1 from "../containers/DashboardCard1";
import DashboardCard2 from "../containers/DashboardCard2";
import DashboardCard4 from "../containers/DashboardCard4";
import DashboardCard3 from "../containers/DashboardCard3";
import DashboardCard5 from "../containers/DashboardCard5";
import DashboardCard6 from "../containers/DashboardCard6";
import DashboardCard7 from "../containers/DashboardCard7";

export default function DashboardPage( ) {
    return (
    <React.Fragment>
    <div className="flex flex-col flex-wrap sm:flex-row">
        {/* 왼쪽 상하 */}
        <div className="w-full sm:w-1/2 xl:w-1/3">
            <DashboardCard1 />
            <DashboardCard2 />
            <DashboardCard7 />
        </div>
        {/* 중간 상하 */}
        <div className="w-full sm:w-1/2 xl:w-1/3">
            <DashboardCard3 />
            <DashboardCard4 />
        </div>
        {/* 오른쪽 상하 */}
        <div className="w-full sm:w-1/2 xl:w-1/3">
            <DashboardCard5 />
            <DashboardCard6 />
        </div>
    </div>    
    </React.Fragment>
    )
}