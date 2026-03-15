import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from '../config/axios.js';

const MasterDataContext = createContext();

export function MasterDataProvider({ children }) {
    const [pressureUnits, setPressureUnits] = useState([]);
    const [productTypes, setproductTypes] = useState([]);
    const [productStandardSizes, setproductStandardSizes] = useState([]);

const fetchMasterData = async () => {
        try {
            // Fetching data from DB to be used on interface:
            const [unitsRes, typesRes, sizesRes] = await Promise.all([
                axiosClient.get('/api/v1/pressure-units'),
                axiosClient.get('/api/v1/product-types'),
                axiosClient.get('/api/v1/sizes')
            ]);

            setPressureUnits(unitsRes.data);
            setproductTypes(typesRes.data);
            setproductStandardSizes(sizesRes.data);
        } catch (error) {
            console.error("Critical: Could not fetch master data from API", error);
        }
    };

    useEffect(() => {
        fetchMasterData();
    }, []);

    return (
      <MasterDataContext.Provider
        value={{
            pressureUnits,
            productTypes,
            productStandardSizes
        }}
      >
        {children}
      </MasterDataContext.Provider>
    );
};

export const useMasterData = () => useContext(MasterDataContext);
