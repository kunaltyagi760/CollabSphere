'use client'
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();


export const AppProvider = ({ children }) => {


    const values = {

    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use context
export const useAppContext = () => useContext(AppContext);
