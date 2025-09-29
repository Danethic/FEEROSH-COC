import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
    address: string | null;
    connect: () => Promise<void>;
    disconnect: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(localStorage.getItem('walletAddress') || null);

    const connect = async () => {
        const ethereum = (window as any).ethereum;
        if (!ethereum) throw new Error('No se detectó ninguna wallet. Instala MetaMask u otra wallet compatible.');
        // Solicita cuentas
        const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
        if (!accounts || accounts.length === 0) throw new Error('No se encontraron cuentas.');
        const a = accounts[0];
        setAddress(a);
        localStorage.setItem('walletAddress', a);
    };

    const disconnect = () => {
        setAddress(null);
        localStorage.removeItem('walletAddress');
    };

    return (
        <AuthContext.Provider value={{ address, connect, disconnect }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
};
