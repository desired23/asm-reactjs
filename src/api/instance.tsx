import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8088/api',
    // headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": "Bearer token"
    // },
    // timeout: 3000
})

export default instance