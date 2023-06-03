import axios from 'axios';

const token = window.localStorage.getItem('token');
console.log("AIWT: TOKEN: ",token);

const axiosInstanceWithToken = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});


export { axiosInstanceWithToken };