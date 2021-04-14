import axios from "axios";

export const login = ( body ) => {
    console.log("요청 보냄");
    const url = `http://localhost:5000/sign/login`;
    return axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json'
    }})
    .then( data => data.data )
    .catch( error => { throw new Error(error); });
}