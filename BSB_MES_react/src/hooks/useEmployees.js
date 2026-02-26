import { useState, useCallback } from "react";
import axiosClient from "../config/axios.js";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOperators = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/employees", { params });
      setEmployees(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load employees.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveEmployee = async (payload, id = null) => {
    const isEdit = !!id;
    const url = isEdit ? `/api/employees/${id}` : "api/register";
    const method = isEdit ? "put" : "post";
    const { data }  = await axiosClient[method](url, payload);
    return data;
  };

  const deleteEmployee = async (id) => {
    const { data } = await axiosClient.delete(`/api/employees/${id}`);
    return data;
  };

  return { employees, isLoading, error, fetchOperators, saveEmployee, deleteEmployee};
};