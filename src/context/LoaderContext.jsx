import { createContext, useContext, useState } from "react";
import { Spinner } from "../components/ui/Spinner";

export const LoaderContext = createContext(undefined);

export function LoaderProvider({ children }) {
    const [globalLoader, setGlobalLoader] = useState(false);

    return (
        <LoaderContext.Provider value={{ globalLoader, setGlobalLoader }}>
            { globalLoader && <Spinner />}
            {children}
        </LoaderContext.Provider>
    )
}

export function useGlobalLoader() {
    return useContext(LoaderContext);
}