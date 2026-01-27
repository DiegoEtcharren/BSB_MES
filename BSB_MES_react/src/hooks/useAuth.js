import useSWR from 'swr'; // Install: npm install swr
import axiosClient from '../config/axios.js';
import { useNavigate } from 'react-router-dom';
import { createRef, useEffect, useState} from "react";


export const useAuth = ({middleware, url}) => { // Middleware is to indenfity what kind of user is available to see the component, and url is the page to be redirected incase its needed.
    const token = localStorage.getItem('AUTH_TOKEN'); // Get the token from the authentication, store on the local user.
    const navigate = useNavigate();

    const { data: user, error, mutate} = useSWR('/api/user', () => // SWR, will first look in the user cache to see if the data is available if not, it will make the fetch. The first argument of the function is the ID of this information, how SWR will look for the information.
        axiosClient('api/user', { // Fetcher, with token retrieved from the local storage memory. This will provide the user information only if the client has a valid token. If the token is invalid, it will retrieve an error.
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (loginData, setErrors) => {
        try {
        const {data} = await axiosClient.post('api/login', loginData);
        localStorage.setItem('AUTH_TOKEN', data.token); // Save the token given by Laravel, on the local user.
        setErrors([]);
        await mutate();
        } catch (error) {
        setErrors(Object.values(error.response.data.errors).flat());
        }
    }

    const logout = () => {
        console.log('click');
    }

    useEffect(() => {
        if(middleware ==='guest' && url && user) {
            navigate(url);
        }

        if(error) {
            navigate('/auth/login');
        }
    }, [user, error])

    return {
        login,
        logout,
        user,
        error
    }
}