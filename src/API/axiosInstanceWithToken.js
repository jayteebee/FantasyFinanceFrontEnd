import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstanceWithToken = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export { axiosInstanceWithToken };