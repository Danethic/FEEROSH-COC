import { mainnet, polygon, polygonMumbai, sepolia } from 'viem/chains';
import { http } from 'viem';

export const DEFAULT_CHAIN = polygonMumbai;

export const transports = {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [polygonMumbai.id]: http('https://rpc-mumbai.maticvigil.com'),
    [sepolia.id]: http('https://rpc.sepolia.org'),
};
