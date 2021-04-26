import { combineReducers } from "redux";
import isLoggedInReducer from "./isLoggedInReducer";
import signReducer from "./signReducer";
import alterMessage from "./alertMessage";

const mainReducer = combineReducers({
    isLoggedInReducer,
    signReducer,
    alterMessage,
});
export default mainReducer;