// 로그인 리듀서
export default function isLoggedReducer( state = false, action ){
    switch(action.type){
        case "SIGNIN" : 
            return action.payload;
        default : 
            return state;
    }
}