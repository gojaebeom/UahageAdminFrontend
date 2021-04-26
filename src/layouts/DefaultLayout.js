import React from "react";
import { Aside } from "../containers/Aside";
import { Nav } from "../containers/Nav";

export default function DefaultLayout ( props ) {
    return (
    <React.Fragment>
        <main className="bg-gray-100 dark:bg-gray-800 rounded-2xl relative h-screen overflow-hidden relative">
            <div className="flex items-start justify-between">
                <Aside />
                <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                    <Nav title={ props.title }/>
                    <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
                        { props.children }
                    </div>
                </div>
            </div>
        </main>
    </React.Fragment>
    )
}