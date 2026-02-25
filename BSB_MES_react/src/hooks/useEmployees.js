import { useState, useCallback } from "react";
import axiosClient from "../config/axios.js";

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

  const saveEmployee = async (payload, id = null) => {
    const isEdit = !!id;
    const url = isEdit ? `/api/employees/${id}` : "api/register";
    const method = isEdit ? "put" : "post";

    try {
      const { data } = await axiosClient[method](url, payload);
      setErrors([]);
      // Return both the data and the mode to the caller
      return { data, isEdit };
    } catch (error) {
      setErrors(error.response?.data?.errors);
      throw error;
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axiosClient.delete(`/api/employees/${id}`);
      fetchOperators();
      return true;
    } catch (err) {
      throw err;
    }
  };

  return { employees, isLoading, error, fetchOperators, saveEmployee, deleteEmployee};
};