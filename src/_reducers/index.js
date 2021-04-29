import { combineReducers } from "redux";
import isLoggedInReducer from "./isLoggedInReducer";
import { modalReducer } from "./modalReducer";

const mainReducer = combineReducers({
    // 로그인 상태
    isLoggedInReducer,
    // 매니저 모달 상태
    modalReducer,
});
export default mainReducer;