import React from "react";
import NavProfile from "./NavProfile";

export function Nav(props) {
    return (
    <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
        <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
            <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="container relative left-0 z-50 flex w-3/4 text-xl">
                    <h1 className="text-2xl text-gray-600">
                        {props.title}
                    </h1>
                </div>
                <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                    <NavProfile />
                </div>
            </div>
        </div>
    </header>
    )
}