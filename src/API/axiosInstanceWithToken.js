import axios from 'axios';

const token = window.localStorage.getItem("token");

const axiosInstanceWithToken = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
                ? 'https://fantasy-finance-c6a108a05dfa.herokuapp.com/' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
    },
});


export { axiosInstanceWithToken };

