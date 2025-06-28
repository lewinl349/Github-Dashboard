import { createContext, useContext, useState } from 'react';

const ReadyContext = createContext()

export function ReadyProvider({ children }) {
    const [ready, setReady] = useState(false);

    const value = { ready, setReady }
    return (
        <ReadyContext.Provider value={value}>
            {children}
        </ReadyContext.Provider>
    )
}

export function useReady() {
    const context = useContext(ReadyContext);

    if (context == undefined) throw new Error("useReady must be used within ReadyProvider");

    return context;
};