import { useState, useCallback } from 'react';
import axiosClient from '../config/axios.js';

export const useEmployees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOperators = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/api/employees", { params }); // Pass pagination parameters
            setEmployees(response.data.data); // Adjust based on Laravel pagination wrap
        } catch (err) {
            setError(err.response?.data?.message || "Could not load employees.");
        } finally {
            setLoading(false);
            console.log(employees);
        }
    }, []);

    return { employees, isLoading, error, fetchOperators };
};