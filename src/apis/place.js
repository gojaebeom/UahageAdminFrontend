import axios from "axios";
import { DOMAIN } from "../settingProxy";

const jwtToken = sessionStorage.getItem("ut");

export function index({ search, asc, page, placeCode }) {
    let pathname = `/api/admin/places?`;
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
    if( placeCode !== "" ){
        ( search !== "" || page || asc ) ?
        pathname += `&pc=${placeCode}` :
        pathname += `pc=${placeCode}`;
    }

    console.log(`최종 pathname : ${ pathname }`);

    return axios.get(DOMAIN + pathname, {
        headers: {
            'Authorization' : jwtToken
        }
    })
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}

export function show( id ){
    let pathname = `/api/admin/places/${id}`;
    return axios.get(DOMAIN + pathname, {
        headers: {
            'Authorization' : jwtToken
        }
    })
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}

export function update( body, id ){
    let pathname = `/api/admin/places/${id}`;
    return axios.put(DOMAIN + pathname, body, {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : jwtToken
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
    let pathname = `/api/admin/places/${id}`;
    return axios.delete( DOMAIN + pathname, {
        headers: {
            'Authorization' : jwtToken
        }
    })
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}