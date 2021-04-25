const alertState = {
    isOpen:false,
    message : "",
    timer : 2000,
    messageType : "success"
}

export default function alertMessage(state=alertState, action) {
    switch(action.type){
        case "MESSAGE":
            return { ...action.payload }
        default :
            return state;
    }
}