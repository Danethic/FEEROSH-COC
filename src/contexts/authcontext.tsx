import React, { createContext, useContext, useState } from 'react';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { mainnet } from 'viem/chains';

type WalletAdapter = {
    name: string;
    connect: () => Promise<string>;
    disconnect: () => Promise<void>;
    isAvailable: () => boolean;
};

type AuthContextType = {
    address: string | null;
    connect: (walletType?: 'metamask' | 'walletconnect') => Promise<void>;
    disconnect: () => Promise<void>;
    walletType: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🚀 MetaMask adapter
const metamaskAdapter: WalletAdapter = {
    name: 'MetaMask',
    isAvailable: () => typeof (window as any).ethereum !== 'undefined',
    connect: async () => {
        const ethereum = (window as any).ethereum;
        if (!ethereum) throw new Error('MetaMask no está disponible.');
        const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts[0];
    },
    disconnect: async () => {
        // MetaMask no requiere desconexión manual
    },
};

// 🌐 WalletConnect adapter
const walletConnectAdapter = (function () {
    let provider: any = null;

    return {
        name: 'WalletConnect',
        isAvailable: () => true,
        connect: async () => {
            provider = await EthereumProvider.init({
                projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // 🔑 reemplaza esto
                chains: [mainnet.id],
                showQrModal: true,
            });

            await provider.enable();
            const accounts: string[] = await provider.request({ method: 'eth_accounts' });
            return accounts[0];
        },
        disconnect: async () => {
            if (provider) await provider.disconnect();
            provider = null;
        },
    };
})();

// 🧩 AuthProvider principal
export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [address, setAddress] = useState<string | null>(localStorage.getItem('walletAddress') || null);
    const [walletType, setWalletType] = useState<string | null>(localStorage.getItem('walletType') || null);

    const connect = async (preferred?: 'metamask' | 'walletconnect') => {
        try {
            let adapter: WalletAdapter;

            // Selección automática o manual
            if (preferred === 'metamask' && metamaskAdapter.isAvailable()) adapter = metamaskAdapter;
            else if (preferred === 'walletconnect') adapter = walletConnectAdapter;
            else adapter = metamaskAdapter.isAvailable() ? metamaskAdapter : walletConnectAdapter;

            const addr = await adapter.connect();

            setAddress(addr);
            setWalletType(adapter.name);
            localStorage.setItem('walletAddress', addr);
            localStorage.setItem('walletType', adapter.name);
        } catch (err: any) {
            console.error('Error conectando wallet:', err);
            alert(err.message || 'Error conectando wallet');
        }
    };

    const disconnect = async () => {
        try {
            if (walletType === 'WalletConnect') await walletConnectAdapter.disconnect();
            setAddress(null);
            setWalletType(null);
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('walletType');
        } catch (err) {
            console.error('Error al desconectar:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ address, connect, disconnect, walletType }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return ctx;
};
