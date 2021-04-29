// 중복되는 코드 분리
function getPayloadByToken(){
    const token = sessionStorage.getItem("ut");
    console.log(token);
    if( token === null || token === "null" || token === "" || token === null ){
        return false;
    } else {
        const base64payload = token.split(".")[1];
        try{
            const payloadText = atob(base64payload);
            const payloadJson =  JSON.parse(payloadText);
            return payloadJson;
        }catch( e ) {
            return false;
        }
    }
}

// token 채크
export function tokenValidation( ) {
    const result = getPayloadByToken();
    if( !result ) return false;

    const { roles } = result;
    if( roles === "SUPER" || roles === "MANAGER" || roles === "GENERAL") return true;
    
    return false;
}

// SUPER 권한 채크
export function isSuperAdmin( ) {
    const result = getPayloadByToken();
    if( !result ) return false;

	const { roles } = result;
    console.log(roles);
    if ( roles !== "SUPER") return false;

    return true;
}

// 토큰 삭제
export function deleteToken( ) {
    sessionStorage.removeItem("ut");
}
