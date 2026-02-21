import { useState, useCallback } from 'react';
import axiosClient from '../config/axios.js';

export const useEmployees = () => {
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOperators = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const response = await axiosClient.get("/api/employees", { params }); // Pass pagination parameters
            setOperators(response.data.data.data); // Adjust based on Laravel pagination wrap
        } catch (err) {
            setError(err.response?.data?.message || "Could not load operators.");
        } finally {
            setLoading(false);
        }
    }, []);

    return { operators, loading, error, fetchOperators };
};