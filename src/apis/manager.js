import axios from "axios";
import { DOMAIN } from "../settingProxy";

export function index({ search, asc, page, isNotVerified }) {

    let pathname = `/api/admin/managers?`;
    if( search !== "") pathname += `search=${ search }`;
    if( page ){
        ( search !== "" ) ? 
        pathname += `&page=${ page }` :
        pathname += `page=${ page }`;
    }
    if( asc ){
        (search !== "" || page ) ? 
        pathname += `&sort=asc` : 
        pathname += `sort=asc`;
    }
    if( isNotVerified ){
        ( search !== "" || page || asc ) ?
        pathname += `&iv=0` :
        pathname += `iv=0`;
    }

    console.log(`최종 pathname : ${ pathname }`);

    return axios.get(DOMAIN + pathname, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}

export function _delete( id ){
    let pathname = `/api/admin/managers/${id}`;
    return axios.delete(DOMAIN + pathname)
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}
