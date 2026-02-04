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

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('AUTH_TOKEN');
            // Optional: Force reload to send them to login
            // window.location.reload();
        }
        throw error;
    }
);

export default axiosClient;