import React from "react";
import DashboardCard1 from "../layouts/dashboardCard1";
import DashboardCard2 from "../layouts/dashboardCard2";
import DashboardCard4 from "../layouts/dashboardCard4";
import DashboardCard3 from "../layouts/dashboardCard3";
import DashboardCard5 from "../layouts/dashboardCard5";
import DashboardCard6 from "../layouts/dashboardCard6";
import DashboardCard7 from "../layouts/dashboardCard7";

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