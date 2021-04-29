import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { index, _delete } from "../apis/place";
import { isSuperAdmin } from "../utils/jwt";

export default function PlageListPage( ) {
    // // 모달창 상태 감지
    const modalState = useSelector(state => state.modalReducer);
    useEffect(()=> {
        if( modalState.refresh ) {
            setPlaceByIndexApi();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalState]);


    // 장소 리스트 상태
    const [place, setPlace] = useState([]);
    // 페이징 처리 상태
    const [paginate, setPaginate] = useState({
        totalPage : 0,
        //currentPage : 1,
        perPage : 10,
        startPage : 1, // 임시 데이터
        lastPage : 5, // 임시 데이터
    });
    // 필터링 상태
    const [filter, setFilter] = useState({
        search : "",
        placeCode : "",
        page : 1,
    });
    // 필터 이벤트시 실행 함수
    const filterEvent = ( e ) => {
        const name = e.target.name;
        const value = e.target.value;
        // 💡 search 관련 기능은 debounce 방식으로 개선해야함
        if( name === "search") setFilter({...filter, search : value});
        else if( name === "sort") setFilter({...filter, asc : !filter.asc});
        else if( name === "placeCode") setFilter({...filter, placeCode : value });
        else if( name === "address") setFilter({...filter, address : value});
        console.log(filter);
    }
    // 유저 리스트 초기화
    const setPlaceByIndexApi = async () => {
        const res = await index( filter );
        if( res.status !== 200) return alert("시스템 에러");

        const placeList = res.data.result.data;
        console.log(placeList);
        setPlace([ ].concat(placeList));

        const totalCount = placeList[0] ? placeList[0].total : 0;
        const countList = 10;
        const totalPage = Math.ceil(totalCount / countList);
        
        //if (totalPage < filter.page) setFilter({...filter, page : totalPage});
        const startPage = (Math.floor((filter.page - 1) / 10)) * 10 + 1;
        console.log(filter.page);
        console.log(startPage);
        setPaginate({
            ...paginate, 
            totalPage : totalPage, 
            startPage : startPage,
            lastPage : startPage + paginate.perPage -1
        });

        const buttons = document.querySelector(".paginate-button-wrap").querySelectorAll("button");
        for(let item of buttons){
            const buttonNumber = Number(item.textContent.trim());
            if(buttonNumber === filter.page){
                item.style.color = '#5DADE2';
                item.style.background = '#F8F9F9';
            }else {
                item.style.color = 'gray';
                item.style.background = 'white';
            }
        }
    }



    // 페이지 시작시 매니저리스트 API 요청 및 매니저 리스트 상태 업데이트
    // 필터 상태가 바뀔 때 마다 실행 🎈
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setPlaceByIndexApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ filter ]);

    // 모달창 오픈 -> redux 로 상태관리
    const dispatch = useDispatch();
    const openEditModalEvent = ( id ) => {
        dispatch({ 
            type : "MODAL_TOGGLE", 
            payload : { target:"USER", open : true, id : id, refresh : false } 
        });
    }

    // 특정 매니저 삭제 버튼 클릭시 이벤트
    const deleteEvent = async ( id ) => {
        // super amdin 채크
        if( !isSuperAdmin() ) return alert("권한이 없습니다.");
        // eslint-disable-next-line no-restricted-globals
        const result = confirm("데이터를 삭제하시겠습니까?");
        if(!result) return false; 
        // 삭제 api 요청
        const res = await _delete( id );
        // console.log( res.status );
        // 통신 실패시 함수 중단
        if( res.status !== 200) return alert("시스템 에러");
        // 매니저리스트 갱신
        setPlaceByIndexApi();
    }
    
    // 첫 페이지 클릭 이벤트
    const startButtonEvent = ( ) => {
        if( filter.page !== 1 ) setFilter({...filter, page : 1});
    }
    // 다음 버튼 클릭 이벤트
    const nextButtonEvent = ( ) => {
        if(filter.page + 10 <= paginate.totalPage){
            setFilter({...filter, page: filter.page + 10});
        }else {
            setFilter({...filter, page: paginate.totalPage});
        }
    }
    // 이전 버튼 클릭 이벤트
    const prevButtonEvent = ( ) => {
        if(filter.page - 10 >= 1){
            setFilter({...filter, page : filter.page - 10 });
        }else {
            setFilter({...filter, page: 1 });
        }
    }
    // 마지막 버튼 클릭 이벤트
    const endButtonEvent = ( ) => {
        if( paginate.totalPage !== filter.page ) setFilter({...filter, page : paginate.totalPage});
    }
    // 페이지 이동시 필터 상태 변경 -> filter 상태를 감지하는 useEfffect 실행
    const PageChangeEvent = ( event, pageNumber ) => {
        if( pageNumber !== filter.page ) {
            setFilter({...filter, page : pageNumber });
        }
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
                        <div className="flex ml-3">
                            <div className="flex justify-center items-center border rounded px-3 mr-2">
                                <label htmlFor="f-asc">
                                    <span className="mr-2 text-gray-600">역정렬</span>
                                    <input name="sort" id="f-asc" type="checkbox"
                                        onChange={ filterEvent }
                                    />
                                </label>
                            </div>
                            <div className="flex justify-center items-center border rounded px-3 mr-2">
                                <span className="mr-2 text-gray-600">장소 종류</span>
                                <select 
                                    name="placeCode"
                                    onChange={ filterEvent }
                                >
                                    <option value="">전체</option>
                                    <option value="1">식당,카페</option>
                                    <option value="2">병원</option>
                                    <option value="3">어린이집</option>
                                    <option value="4">유치원</option>
                                    <option value="5">키즈카페</option>
                                    <option value="6">체험관</option>
                                    <option value="7">유원지</option>
                                    <option value="8">장난감도서관</option>
                                    <option value="9">유원지</option>
                                </select>
                            </div>
                            {/* <div className="flex justify-center items-center border rounded px-3 mr-2">
                                <span className="mr-2 text-gray-600">지역</span>
                                <select 
                                    name="address"
                                    onChange={ filterEvent }
                                >
                                    <option value="">모두</option>
                                    <option value="서울특별시">서울</option>
                                    <option value="부산광역시">부산</option>
                                    <option value="대구광역시">대구</option>
                                    <option value="인천광역시">인천</option>
                                    <option value="광주광역시">광주</option>
                                    <option value="대전광역시">대전</option>
                                    <option value="울산광역시">울산</option>
                                    <option value="세종">세종</option>
                                    <option value="경기도">경기도</option>
                                    <option value="강원도">강원도</option>
                                    <option value="충청북도">충청북도</option>
                                    <option value="충청남도">충청남도</option>
                                    <option value="경상북도">경상북도</option>
                                    <option value="경상남도">경상남도</option>
                                    <option value="전라북도">전라북도</option>
                                    <option value="전라남도">전라남도</option>
                                    <option value="제주도">제주도</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="pr-3">
                            <input type="text" id="&quot;form-subscribe-Subscribe" 
                                name="search"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 py-2 px-4
                                bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" 
                                placeholder="..장소명, 주소 검색"
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
                                    <th className="py-3 px-6 text-left">이름</th>
                                    <th className="py-3 px-6 text-center">주소</th>
                                    <th className="py-3 px-6 text-center">전화번호</th>
                                    {/* <th className="py-3 px-6 text-center">위도</th>
                                    <th className="py-3 px-6 text-center">경도</th> */}
                                    <th className="py-3 px-6 text-center">설정</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {
                                    place.map( (e, index) => {
                                        return( 
                                            <tr key={index}  className="border-b border-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        { e.id }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center">
                                                        { e.name }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center justify-center">
                                                        { e.address }
                                                    </div>
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    <div className="flex items-center justify-center">
                                                        { e.phone }
                                                    </div>
                                                </td>
                                                {/* <td className="py-3 px-6 text-center">
                                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                        { e.lat  }
                                                    </span>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                        { e.lon }
                                                    </span>
                                                </td> */}
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        {/* <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </div> */}
                                                        {/* 수정 버튼 */}
                                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                                            onClick={ () => openEditModalEvent( e.id ) }
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </div>
                                                        {/* 삭제 버튼 */}
                                                        <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                                                            onClick={ () => deleteEvent( e.id ) }
                                                        >
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

            <div className="flex justify-center">
                <div className="paginate-button-wrap flex items-center justify-center w-1/4 mt-3">
                    <button type="button" className="w-full p-2 pl-3 pr-3 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                        onClick={ startButtonEvent }
                    >
                        start
                    </button>
                    {
                        filter.page !== 1 &&
                        <button type="button" className="w-full p-4 border border-l-0 text-base text-gray-600 bg-white hover:bg-gray-100"
                            onClick={prevButtonEvent}
                        >
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                    }
                    
                    {
                        //paginate.totalPage
                        [...Array(paginate.perPage)].map( (e, index) => {
                            // console.log(`시작 페이지 : ${ paginate.startPage }`);
                            // console.log(`마지막 페이지 : ${ paginate.lastPage }`);
                            // console.log(`총 페이지 갯수 : ${ paginate.totalPage}`);
                            const number = index + paginate.startPage;
                            if( number <= paginate.totalPage ){
                                return (
                                    <button key={ number }
                                        type="button"
                                        className={`w-full px-4 py-2 border-t border-b border-r text-base  text-gray-600 hover:text-indigo-500 bg-white hover:bg-gray-100`}
                                        onClick={ ( e ) => PageChangeEvent( e, number ) }
                                    >
                                        { number }
                                    </button>
                                )
                            }
                        })
                    }
                    {
                        filter.page !== paginate.totalPage && 
                        <button type="button" className="w-full p-4 border-t border-b border-r text-base text-gray-600 bg-white hover:bg-gray-100"
                            onClick={nextButtonEvent}
                        >
                            <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                </path>
                            </svg>
                        </button>
                    }
                    <button type="button" className="w-full p-2 pl-3 pr-3 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                        onClick={ endButtonEvent }
                    >
                        end
                    </button>
                </div>
            </div>
        </div>
    </div>
    </React.Fragment>
    )
}