// src/services/marketplaceService.ts
import axios from 'axios';
import { blockchainService } from './blockchainService';

const API_URL = 'https://api.tu-backend.io'; // backend propio o un indexer NFT

export interface NFTItem {
    id: string;
    name: string;
    image: string;
    description?: string;
    owner?: string;
    priceEth?: number;
    metadata?: Record<string, any>;
}

export const marketplaceService = {
    /** 🔹 Obtiene lista de NFTs disponibles en el marketplace */
    async getListedNFTs(): Promise<NFTItem[]> {
        const { data } = await axios.get(`${API_URL}/nft/listed`);
        return data;
    },

    /** 🔹 Obtiene NFTs de un usuario (lectura desde blockchain o backend cacheado) */
    async getUserNFTs(address: string): Promise<NFTItem[]> {
        const tokenIds = await blockchainService.getUserNFTs(address);
        const { data } = await axios.post(`${API_URL}/nft/metadata`, { tokenIds });
        return data;
    },

    /** 🔹 Obtiene detalles de un NFT */
    async getNFTDetails(id: string): Promise<NFTItem> {
        const { data } = await axios.get(`${API_URL}/nft/${id}`);
        return data;
    },

    /** ⚡️ Lanza la conexión WalletConnect para comprar (fuera de la app) */
    async buyNFT(id: string, walletConnector: any): Promise<void> {
        // Aquí solo se inicia la conexión, no se procesa la compra interna
        try {
            const nftData = await marketplaceService.getNFTDetails(id);
            console.log('Abriendo WalletConnect para comprar:', nftData.name);
            await walletConnector.connect();
            // Redirigir a la dApp externa que maneja la venta real
            window.open(`https://marketplace.tu-dapp.io/nft/${id}`, '_blank');
        } catch (err) {
            console.error('Error al iniciar compra vía WalletConnect:', err);
        }
    },
};
