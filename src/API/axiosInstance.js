import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
                ? 'https://fantasy-finance-c6a108a05dfa.herokuapp.com/' 
                : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
