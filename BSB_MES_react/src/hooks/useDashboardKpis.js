import { useState, useCallback } from "react";
import axiosClient from "../config/axios.js";

export const useDashboardKpis = () => {
  const [kpis, setKpis] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardKpis = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get("/api/v1/dashboard/kpis");
      setKpis(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load dashboard KPIs.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { kpis, isLoading, error, fetchDashboardKpis };
};
