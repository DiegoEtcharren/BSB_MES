import axiosClient from '../config/axios.js';
import { createRef, useState} from "react";


export const useAuth = ({middleware, url}) => { // Middleware is to indenfity in which part of the application is the function being used.
    const login = async (loginData, setErrors) => {
        try {
        const {data} = await axiosClient.post('api/login', loginData);
        console.log(data.message);
        localStorage.setItem('AUTH_TOKEN', data.token);
        setErrors([]);
        } catch (error) {
        console.log(error.response.data.errors);
        setErrors(Object.values(error.response.data.errors).flat());
        }
    }

    return {
        login
    }
}