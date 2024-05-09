// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend-9mwl.onrender.com/'
});

export default axiosInstance;

export const weburl = 'https://backend-9mwl.onrender.com/';

