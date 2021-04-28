import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../apis/manager";
import dummyImage from "../assets/profile.jpg"

export default function ManagerDetailModal( ) {
    
    
    
    const modalState = useSelector(state => state.managerModalReducer);
    const [manager , setManager] = useState({
        id : 0, 
        profilePath : "",
        nickname : "",
        email : "",
        roles : "",
        isVerified : 0,
        createdAt : "",
    });
    // 매니저 디테일 API 요청 및 메니저 상태 변경
    const setManagerByShowApi = async () => {
        const res = await show( modalState.managerId );
        if( res.status !== 200) {
            return alert("시스템 에러");
        }
        console.log(res.data.result);
        const { id, profile_path, email, nickname, is_verified, roles, created_at } = res.data.result;
        setManager({
            ...manager,
            id : id,
            profilePath : profile_path,
            email : email, 
            nickname : nickname,
            isVerified : is_verified,
            roles : roles,
            createdAt : created_at
        });
    }
    
    useEffect( () => {
        setManagerByShowApi();
    }, []);

    // 모달창 닫기 이벤트
    const dispatch = useDispatch();
    const closeModalEvent = ( ) => {
        dispatch({ 
            type : "MANAGER_MODAL_TOGGLE", 
            payload : { open : false, managerId : null } 
        });
    }

    return ( 
    <section className="absolute z-50 w-full h-screen flex justify-center items-center bg-gray-700 bg-opacity-75 ">
        <form className="relative container max-w-2xl mx-auto shadow-md md:w-3/4">
            <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-t-lg">
                <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="inline-flex items-center space-x-4">
                        <div className="block relative">
                            <img alt="profil" src={dummyImage} className="mx-auto object-cover rounded-full h-16 w-16 "/>
                        </div>
                        <h1 className="text-gray-600">
                            Charlie
                        </h1>
                    </div>
                    <div className="absolute right-5 top-5 cursor-pointer"
                        onClick={ closeModalEvent }
                    >
                        <i className="fas fa-times text-purple-700 text-2xl"></i>
                    </div>
                </div>
            </div>
            <div className="space-y-6 bg-white">
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Account
                    </h2>
                <div className="max-w-sm mx-auto md:w-2/3">
                    <div className=" relative ">
                        <input type="text" id="user-info-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        Personal info
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                    <div>
                        <div className=" relative ">
                            <input type="text" id="user-info-name" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                            </div>
                        </div>
                        <div>
                            <div className=" relative ">
                                <input type="text" id="user-info-phone" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Phone number"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
            <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-4/12">
                    Change password
                </h2>
                <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
                    <div className=" relative ">
                        <input type="text" id="user-info-password" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="text-center md:w-3/12 md:pl-6">
                        <button type="button" className="py-2 px-4  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Change
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                    <button type="submit" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Save
                    </button>
                </div>
            </div>
        </form>
    </section>
    )
}