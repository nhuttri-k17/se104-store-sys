import React, { createContext, use, useContext } from "react";
import apiConfig from "@/lib/api.config";

const DataProviderContext = createContext();

export const DataProvider = ({ baseUrl, children }) => {
    const api = apiConfig(baseUrl);

    return (
        <DataProviderContext.Provider value={api}>
            {children}
        </DataProviderContext.Provider>
    );
};

export const useDataProviderContext = () => useContext(DataProviderContext);
