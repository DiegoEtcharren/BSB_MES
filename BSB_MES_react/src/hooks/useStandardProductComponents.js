import { useState, useCallback } from "react";
import axiosClient from "../config/axios.js";

export const useStandardProductComponents = () => {
  const [productComponents, setProductComponents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductComponents = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/v1/standard-components", { params });
      setProductComponents(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load Product Components.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { productComponents, isLoading, error, fetchProductComponents};
};