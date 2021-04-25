// 로그인 , 회원가입에서 공통적으로 사용되는 객체 ( 로그인시 nickname 사용안함 )
const signInState = {
    email : "",
    password : "",
    nickname : "",
}
export default function signReducer(state=signInState, action) {
    switch(action.type){
        case "INPUT_SIGN_DATA":
            if( action.payload.name === "email") 
                return {...state, email : action.payload.data};
            else if ( action.payload.name === "password") 
                return {...state, password : action.payload.data};
            else if ( action.payload.name === "nickname")
                return {...state, nickname : action.payload.data};
            break;
        case "CLEAR_SIGN_DATA":
            return {email : "", password : "", nickname : ""};
        default :
            return state;
    }
}