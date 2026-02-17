import useSWR, { mutate } from 'swr'; // Install: npm install swr
import axiosClient from '../config/axios.js';
import { useNavigate } from 'react-router-dom';
import { createRef, useEffect, useState} from "react";


export const useAuth = ({middleware, url}) => { // Middleware is to indenfity what kind of user is available to see the component, and url is the page to be redirected incase its needed.
    const token = localStorage.getItem('AUTH_TOKEN'); // Get the token from the authentication, store on the local user.

    const navigate = useNavigate();

    const { data: user, error, mutate} = useSWR('/api/user', () => // SWR, will first look in the user cache to see if the data is available if not, it will make the fetch. The first argument of the function is the ID of this information, how SWR will look for the information.
        axiosClient.get('api/user') // Fetcher, with token retrieved from the local storage memory. This will provide the user information only if the client has a valid token. If the token is invalid, it will retrieve an error.
        .then(res=>res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error;
        })
    )

    const login = async (loginData, setErrors) => {
        try {
            await axiosClient.get('/sanctum/csrf-cookie'); // Initialize CSRF protection
            const {data} = await axiosClient.post('api/login', loginData);
            localStorage.setItem('AUTH_TOKEN', data.token);
            // Re-validate user data immediately
            await mutate();
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(Object.values(error.response.data.errors).flat());
            } else {
                console.error("Login Error:", error);
            }
        }
    }

    const logout = async () => {
      try {
        await axiosClient.post("/api/logout");
        localStorage.removeItem('AUTH_TOKEN');
        await mutate(null, false);
        navigate('/auth/login');
      } catch (error) {
        console.error("Logout Error:", error);
      }
    };

    const userRegister = async (userData, setErrors) => {
      try {
        const { data } = await axiosClient.post("api/register", userData);
        setErrors([]);
        console.log(data);
      } catch (error) {
        setErrors(error.response.data.errors);
      }
    };

    useEffect(() => {
        if(middleware ==='guest' && user) {
            if(user.role === 'engineer') {
                navigate('/eng/dashboard');
            }

            if (user.role === 'operator') {
                navigate('/ops/dashboard');
            }
        }

        if (middleware === "auth" && error) {
            logout(); // Clean up local storage and redirect
        }

    }, [user, error, middleware, navigate])

    return {
        login,
        logout,
        user,
        error,
        isLoading: !user && !error,
        userRegister
    }
}