import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { show, update } from "../apis/manager";
import dummyImage from "../assets/profile.jpg"
import { isSuperAdmin } from "../utils/jwt";

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
            createdAt : created_at.split("T")[0]
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

    // 매니저 상태 변경 이벤트
    const inputChangeEvent = ( e ) => {
        const value = e.target.value;
        const name = e.target.name; 

        if( name === "nickname" ) return setManager({...manager, nickname : value});
        else if( name === "roles" ) return setManager({...manager, roles : value});
        else if( name === "is_verified" ) {
            if( !isSuperAdmin() ) return alert("관리자 전용 기능입니다.");
            return setManager({...manager, isVerified : !manager.isVerified});
        }
    }

    // 매니저 수정 API 요청
    const updateButtonClickEvent = async ( ) => {
        const res = await update({ 
                        profile_path: manager.profilePath, 
                        nickname : manager.nickname , 
                        is_verified : manager.isVerified ? 1 : 0 , 
                        roles : manager.roles, 
                    } , 
                    modalState.managerId );
        if( res.status !== 200 ) return alert("시스템 에러");
        alert("성공적으로 수정되었습니다.");
        dispatch({ type : "MANAGER_MODAL_TOGGLE", payload : { open:false, id:null, refresh : true}});
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

                        <button type="button" className="py-2 px-4 flex justify-center items-center  bg-purple-600 hover:bg-purple-700 focus:ring-red-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            <svg width="20" height="20" fill="currentColor" className="mr-2" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z">
                                </path>
                            </svg>
                            이미지 변경
                        </button>

                        </h1>
                    </div>
                    <div className="absolute right-5 top-5 cursor-pointer"
                        onClick={ closeModalEvent }
                    >
                        <i className="fas fa-times text-purple-700 text-2xl"></i>
                    </div>
                </div>
            </div>
            <div className="space-y-6 bg-white rounded-b-lg">
                <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0 border-b">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        일반 정보
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                    <div>
                        <div className=" relative ">
                            <input type="text" id="user-info-name" 
                            className=" rounded-lg border-transparent flex-1 appearance-none border 
                            border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 
                            shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent " 
                            value={ manager.email }
                            disabled
                            placeholder="email"/>
                        </div>
                    </div>
                        <div>
                            <div className=" relative ">
                                <input type="text" id="user-info-phone" 
                                className=" rounded-lg border-transparent flex-1 appearance-none border 
                                border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 
                                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 
                                focus:border-transparent" 
                                value={ manager.createdAt }
                                disabled
                                placeholder="created at"/>
                            </div>
                        </div>
                    </div>
        
                </div>
                <div className="items-center w-full p-4 pt-0 space-y-4 text-gray-500 md:inline-flex md:space-y-0 border-b">
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        닉네임
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div className=" relative ">
                            <input type="text" id="user-info-name" 
                                className=" rounded-lg border-transparent flex-1 appearance-none border 
                                border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 
                                shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                name="nickname"
                                placeholder="닉네임"
                                value={ manager.nickname }
                                onChange={ inputChangeEvent }
                            />
                        </div>
                    </div>
                </div>
                <div className="items-center w-full p-4 pt-0 space-y-4 text-gray-500 md:inline-flex md:space-y-0 border-b">   
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        권한 설정
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <select id="roles" 
                            className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm 
                            focus:outline-none focus:ring-primary-500 focus:border-primary-500" 
                            name="roles"
                            value={ manager.roles }
                            onChange={ inputChangeEvent }
                        >
                            {/* <option value="SUPER">
                                SUPER
                            </option> */}
                            <option value="MANAGER">
                                매니저
                            </option>
                            <option value="GENERAL">
                                일반
                            </option>
                        </select>
                    </div>
                </div>
                <div className="items-center w-full p-4 pt-0 space-y-4 text-gray-500 md:inline-flex md:space-y-0 border-b"> 
                    {/* 관리자 인증 컴포넌트 */}
                    <h2 className="max-w-sm mx-auto md:w-1/3">
                        관리자 인증
                    </h2>
                    <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                        <div className="items-center w-full space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                            <label 
                                htmlFor="toogleA"
                                className="flex items-center cursor-pointer"
                            >
                                <div className="relative">
                                    <input id="toogleA" type="checkbox" className="sr-only" 
                                        name="is_verified"
                                        onChange={ inputChangeEvent }
                                        checked={ manager.isVerified ? true : false }
                                    />
                                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                    <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                </div>
                                <div className="ml-3 text-gray-700 font-medium">
                                    {
                                        manager.isVerified ? 
                                        <div className="text-purple-400 font-bold">승인</div> : 
                                        <div className="text-red-400 font-bold">미승인</div>
                                    }
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="items-center w-full p-4 pt-0 space-y-4 text-gray-500 md:inline-flex md:space-y-0 border-b"> 
                    <div className="w-full pl-4 ml-auto flex justify-end text-gray-500 md:w-1/4">
                        <button type="button" 
                            className="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-blue-500 
                            focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center 
                            text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                            onClick={ updateButtonClickEvent }
                        >
                            수정
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </section>
    )
}