const modalState = {
    target : "MANAGER",
    open : false, 
    id : 1,
    refrash : false
}
export function modalReducer(state=modalState, action){
    switch( action.type ) {
        case "MODAL_TOGGLE" :
            return action.payload;
        default : 
            return state;
    }
}