import { useState } from "react";
import axiosClient from "../config/axios.js";

export const useProductionOrders = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return { isLoading, error, saveProductionOrder };
};
