import React, { useEffect, useState } from "react";
import { index } from "../apis/manager";

export default function ManagerListPage( ) {
    // const managers = useSelector(state => state.managerReducer);
    // const dispatch = useDispatch();

    const [managers, setManagers] = useState([
        {
            id : "",
            nickname : "",
            email : "",
            roles : "",
            is_verified : false,
            created_at : ""
        }
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const res = await index({page:1});
        const userList = res.data.result.data;
        //const userTotal = res.data.result.count;
        setManagers([].concat(userList));
    }, []);

    const [filter, setFilter] = useState({
        search : '',
        sort : false,
        page : 1,
        is_verified : 0,
    });
    const filterEvent = ( e ) => {
        console.log("필터 요청중 ");
        const name = e.target.name;
        const value = e.target.value;
        if( name === "search") setFilter({...filter, search : value});
        else if( name === "sort") setFilter({...filter, sort : !filter.sort});
        else if( name === "is_verified") setFilter({...filter, is_verified : value});
    }

    return (
    <React.Fragment>
    <div className="mb-4">
        {/* 필터링 채크박스  */}
        
        <div className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-700 w-full">
            <div className="overflow-x-auto">
                <div className="w-full">
                    {/* 필터링 채크박스 */}
                    <div className="filter-wrapper flex justify-between pt-5">
                        <div className="ml-3">
                            <label htmlFor="f-asc" className="mr-5">
                                <span className="mr-2 text-gray-600">ASC</span>
                                <input name="sort" id="f-asc" type="checkbox"
                                    onChange={ filterEvent }
                                />
                            </label>
                            <label htmlFor="f-is_verified">
                                <span className="mr-2 text-gray-600">미승인 매니저</span>
                                <input name="is_verified" id="f-is_verified" type="checkbox"
                                    onChange={ filterEvent }
                                />
                            </label>
                        </div>
                        <div className="pr-3">
                            <input type="text" id="&quot;form-subscribe-Subscribe" 
                                name="search"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4
                                bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                placeholder="search nickname"
                                value={ filter.search }
                                onChange={ filterEvent } 
                            />
                        </div>
                    </div>
                    {/* x 필터링 채크박스 x */}
                    <div className="bg-white rounded my-3">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">id</th>
                                    <th className="py-3 px-6 text-left">닉네임</th>
                                    <th className="py-3 px-6 text-center">email</th>
                                    <th className="py-3 px-6 text-center">권한</th>
                                    <th className="py-3 px-6 text-center">인증상태</th>
                                    <th className="py-3 px-6 text-center">생성일</th>
                                    <th className="py-3 px-6 text-center">설정</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {
                                    managers.map( (e, index) => {
                                        return( 
                                            <tr key={index}  className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        { e.id }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center">
                                                        { e.nickname }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center justify-center">
                                                        { e.email }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                        { e.roles }
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="bg-red-200 text-red-400 py-1 px-3 rounded-full text-xs">
                                                        { 
                                                            e.is_verified === 1 ? "승인" : "미승인" 
                                                        }
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex items-center">
                                                        { e.created_at.split("T")[0] }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div> */}
                                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </div>
                                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex justify-center ">
                <div className="flex items-center w-1/4 mt-3">
                    <button type="button" className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                            </path>
                        </svg>
                    </button>
                    <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                        1
                    </button>
                    <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                        2
                    </button>
                    <button type="button" className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                        3
                    </button>
                    <button type="button" className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                        4
                    </button>
                    <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                        <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
    )
}