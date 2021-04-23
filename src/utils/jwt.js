export function getTokensPayload ( ) {
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