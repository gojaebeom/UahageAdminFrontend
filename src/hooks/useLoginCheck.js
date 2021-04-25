import { useEffect, useState } from "react";
import { getTokensPayload } from "../utils/jwt";

export default function useLoginCheck( ) {
    const [ isLoggedin, setIsLoggedin ] = useState( false );
    useEffect(()=> {
		const result = getTokensPayload();
		if (!result) return setIsLoggedin(false);
		const { roles } = result;
		console.log(roles);
		if( roles === "SUPER" || roles === "MANAGER" || roles === "GENERAL"){
			setIsLoggedin(true);
		}
	}, [isLoggedin]);

    return isLoggedin; 
}