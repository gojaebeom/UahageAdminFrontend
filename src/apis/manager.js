import axios from "axios";
import { DOMAIN } from "../settingProxy";

export function index({ page }) {
    
    let pathname = `/api/admin/managers`;
    if(page) pathname = `/api/admin/managers?page=${page}`;
    return axios.get(DOMAIN + pathname, {
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
