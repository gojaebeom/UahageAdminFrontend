const managerState = {
    open : false, 
    managerId : 1,
    refrash : false
}

export function managerModalReducer(state=managerState, action){
    switch( action.type ) {
        case "MANAGER_MODAL_TOGGLE" :
            return action.payload;
        default : 
            return state;
    }
}