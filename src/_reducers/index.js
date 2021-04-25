import { combineReducers } from "redux";
import isLoggedReducer from "./isLogged";

const mainReducer = combineReducers({
    isLogged : isLoggedReducer
});
export default mainReducer;