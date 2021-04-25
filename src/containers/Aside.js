import React from "react";
import logo from "../assets/group.png";
import { NavLink } from "react-router-dom";

export function Aside ( ) {
    return (
    <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
        <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
            <div className="flex items-center justify-center pt-6">
                <img src={logo} alt="images" className="w-10"/>
            </div>
            <nav className="mt-6">
                <div>
                    <NavLink to="/" exact
                        className="
                        w-full 
                        font-thin 
                        uppercase 
                        flex 
                        items-center 
                        p-4 
                        my-2 
                        transition-colors 
                        duration-200 
                        justify-start
                        bg-gradient-to-r 
                        dark:from-gray-700 
                        dark:to-gray-800 
                        text-gray-500
                        hover:border-r-4 
                        hover:from-white 
                        hover:to-blue-100 
                        hover:text-blue-500 
                        hover:border-blue-500 
                        "
                        activeStyle={{color:"#3498DB"}}
                        >
                        <span className="text-left">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                </path>
                            </svg>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            대쉬보드
                        </span>
                    </NavLink>
                    <NavLink to="/users" 
                    
                    className="
                    w-full 
                    font-thin 
                    uppercase 
                    flex 
                    items-center 
                    p-4 
                    my-2 
                    transition-colors 
                    duration-200 
                    justify-start
                    bg-gradient-to-r 
                    dark:from-gray-700 
                    dark:to-gray-800 
                    text-gray-500
                    hover:border-r-4 
                    hover:from-white 
                    hover:to-blue-100 
                    hover:text-blue-500 
                    hover:border-blue-500 
                    "
                    activeStyle={{color:"#3498DB"}}
                    >
                        <span className="text-left">
                            <i className="fas fa-users"></i>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            회원 관리
                        </span>
                    </NavLink>
                    <NavLink to="/places" 
                        className="
                        w-full 
                        font-thin 
                        uppercase 
                        flex 
                        items-center 
                        p-4 
                        my-2 
                        transition-colors 
                        duration-200 
                        justify-start
                        bg-gradient-to-r 
                        dark:from-gray-700 
                        dark:to-gray-800 
                        text-gray-500
                        hover:border-r-4 
                        hover:from-white 
                        hover:to-blue-100 
                        hover:text-blue-500 
                        hover:border-blue-500 
                        "
                        activeStyle={{color:"#3498DB"}}
                        >
                        <span className="text-left">
                            <i className="fas fa-map-marked-alt"></i>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            장소 관리
                        </span>
                    </NavLink>
                    <NavLink to="/superusers" 
                        className="
                        w-full 
                        font-thin 
                        uppercase 
                        flex 
                        items-center 
                        p-4 
                        my-2 
                        transition-colors 
                        duration-200 
                        justify-start
                        bg-gradient-to-r 
                        dark:from-gray-700 
                        dark:to-gray-800 
                        text-gray-500
                        hover:border-r-4 
                        hover:from-white 
                        hover:to-blue-100 
                        hover:text-blue-500 
                        hover:border-blue-500"
                        activeStyle={{color:"#3498DB"}}
                        >
                        <span className="text-left">
                            <i className="fas fa-comment-dots"></i>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            매니저 관리
                        </span>
                    </NavLink>
                    <NavLink to="/messages" 
                        className="
                        w-full 
                        font-thin 
                        uppercase 
                        flex 
                        items-center 
                        p-4 
                        my-2 
                        transition-colors 
                        duration-200 
                        justify-start
                        bg-gradient-to-r 
                        dark:from-gray-700 
                        dark:to-gray-800 
                        text-gray-500
                        hover:border-r-4 
                        hover:from-white 
                        hover:to-blue-100 
                        hover:text-blue-500 
                        hover:border-blue-500"
                        activeStyle={{color:"#3498DB"}}
                        >
                        <span className="text-left">
                            <i className="fas fa-comment-dots"></i>
                        </span>
                        <span className="mx-4 text-sm font-normal">
                            사용자 제안 메세지
                        </span>
                    </NavLink>
                </div>
            </nav>
        </div>
    </div>
    )
}