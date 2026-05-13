import { createContext, useState, useEffect, useContext } from "react";
import axiosClient from '../config/axios.js';

const MasterDataContext = createContext();

export function MasterDataProvider({ children }) {
    const [pressureUnits, setPressureUnits] = useState([]);
    const [productTypes, setproductTypes] = useState([]);
    const [productStandardSizes, setproductStandardSizes] = useState([]);
    const [materials, setMaterials] = useState([]);

const fetchMasterData = async () => {
        try {
            // Fetching data from DB:
            const [unitsRes, typesRes, sizesRes, materialsRes] = await Promise.all([
                axiosClient.get('/api/v1/pressure-units'),
                axiosClient.get('/api/v1/product-types'),
                axiosClient.get('/api/v1/sizes'),
                axiosClient.get('/api/v1/materials'),
            ]);

            setPressureUnits(unitsRes.data);
            setproductTypes(typesRes.data);
            setproductStandardSizes(sizesRes.data);
            setMaterials(materialsRes.data.data);
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
            productStandardSizes,
            materials
        }}
      >
        {children}
      </MasterDataContext.Provider>
    );
};

export const useMasterData = () => useContext(MasterDataContext);
