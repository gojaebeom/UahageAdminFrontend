import axios from "axios";

export const crwNurserySchools = ( body ) => {
    console.log("요청 보냄");
    const url = `http://localhost:8000/crw/nursery-schools`;
    return axios.post(url, body, {
        headers: {
            'Content-Type': 'multipart/form-data' // application/json, multipart/form-data
    }})
    .then( data => data.data )
    .catch( error => { throw new Error(error); });
}