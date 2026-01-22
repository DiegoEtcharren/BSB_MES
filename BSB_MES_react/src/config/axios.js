import axios from "axios";

const axiosClient = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    headers : {
        'Accept' : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest',
        'Content-Type': 'application/json',
    },
    withCredentials : true
});

axiosClient.defaults.xsrfCookieName = 'XSRF-TOKEN';
axiosClient.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

export default axiosClient;