import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from '../config/axios.js';

const UnitContext = createContext();

export function UnitProvider({ children }) {
    const [pressureUnits, setPressureUnits] = useState([]);

    const getPressureUnits = async () => {
        try {
            const { data } = await axiosClient.get('/api/v1/pressure-units');
            console.log(data);
            setPressureUnits(data);
        } catch (error) {
            console.error("Critical: Could not fetch pressure units from API", error);
        }
    };

    useEffect(() => {
        getPressureUnits();
    }, []);

    return (
      <UnitContext.Provider
        value={{
            pressureUnits
        }}
      >
        {children}
      </UnitContext.Provider>
    );
};

export const useUnits = () => useContext(UnitContext);
export default UnitContext;