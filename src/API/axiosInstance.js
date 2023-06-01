// Configuring the Axios Instance for the API

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;