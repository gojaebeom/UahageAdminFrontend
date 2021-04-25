import axios from "axios";
import { DOMAIN } from "../settingProxy";

export function signin( body ) {
    const pathname = `/api/admin/auth/signin`;
    return axios.post(DOMAIN + pathname, body, {
        headers: {
            'Content-Type': 'application/json'
    }})
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}

export function signup( body ) {
    const pathname = `/api/admin/auth/signup`;
    return axios.post(DOMAIN + pathname, body, {
        headers: {
            'Content-Type': 'application/json'
    }})
    .then( res => {
        return { status : res.status, data : res.data };
    })
    .catch( error => {
        return { status : error.response.status, data : error.response.data };
    });
}