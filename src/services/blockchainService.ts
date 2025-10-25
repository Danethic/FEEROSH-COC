// src/services/blockchainService.ts
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { mainnet } from 'viem/chains';
import { useAuth } from '../contexts/authcontext';

const CONTRACTS = {
    token: '0xTOKEN_CONTRACT_ADDRESS',
    nft: '0xNFT_CONTRACT_ADDRESS',
    staking: '0xSTAKING_CONTRACT_ADDRESS',
    rewardPool: '0xPOOL_CONTRACT_ADDRESS',
};

// 🚀 Cliente de solo lectura (seguro para app stores)
const publicClient = createPublicClient({
    chain: mainnet,
    transport: http('https://mainnet.infura.io/v3/YOUR_INFURA_ID'),
});

export const blockchainService = {
    /** 📡 Obtiene el balance del token ERC-20 del usuario */
    async getTokenBalance(address: string): Promise<string> {
        const balance = await publicClient.readContract({
            address: CONTRACTS.token as `0x${string}`,
            abi: [
                { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: '_owner', type: 'address' }], outputs: [{ type: 'uint256' }] },
            ],
            functionName: 'balanceOf',
            args: [address],
        });
        return (Number(balance) / 1e18).toFixed(4);
    },

    /** 🧩 Obtiene NFTs del usuario desde el contrato ERC-721 */
    async getUserNFTs(address: string): Promise<number[]> {
        const totalSupply = await publicClient.readContract({
            address: CONTRACTS.nft as `0x${string}`,
            abi: [
                { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ type: 'uint256' }] },
                { name: 'tokenOfOwnerByIndex', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'index', type: 'uint256' }], outputs: [{ type: 'uint256' }] },
            ],
            functionName: 'balanceOf',
            args: [address],
        });

        const nfts: number[] = [];
        for (let i = 0; i < Number(totalSupply); i++) {
            const id = await publicClient.readContract({
                address: CONTRACTS.nft as `0x${string}`,
                abi: [
                    { name: 'tokenOfOwnerByIndex', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'index', type: 'uint256' }], outputs: [{ type: 'uint256' }] },
                ],
                functionName: 'tokenOfOwnerByIndex',
                args: [address, BigInt(i)],
            });
            nfts.push(Number(id));
        }
        return nfts;
    },

    /** 💰 Consulta el valor del fondo de premios */
    async getRewardPool(): Promise<string> {
        const balance = await publicClient.getBalance({ address: CONTRACTS.rewardPool as `0x${string}` });
        return (Number(balance) / 1e18).toFixed(4);
    },

    /** 🧾 Escucha eventos en tiempo real (solo lectura) */
    subscribeToEvents(eventName: string, callback: (data: any) => void) {
        publicClient.watchEvent({
            address: CONTRACTS.nft as `0x${string}`,
            eventName,
            onLogs: callback,
        });
    },
};
