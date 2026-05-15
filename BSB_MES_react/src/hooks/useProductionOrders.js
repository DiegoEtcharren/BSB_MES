import { useState, useCallback } from "react";
import axiosClient from "../config/axios.js";

export const useProductionOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductionOrders = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/v1/production-orders", { params });
      setOrders(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load production orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveProductionOrder = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post("/api/v1/production-orders", payload);
      return response.data;
    } catch (err) {
      const errMsg = err.response?.data?.message || "Could not save production order.";
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProductionOrder = async (id) => {
    const { data } = await axiosClient.delete(`/api/v1/production-orders/${id}`);
    return data;
  };

  return { orders, isLoading, error, fetchProductionOrders, saveProductionOrder, deleteProductionOrder };
};
