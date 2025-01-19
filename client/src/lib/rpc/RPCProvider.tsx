"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserProvider, ethers } from "ethers";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { rpc } from ".";

declare global {
	interface Window {
		ethereum: any;
	}
}

export type RPCContextType = {
	provider: BrowserProvider | null;
	address: string;
	chainId: number;
	balance: string;
	connectWallet: () => void;
};

export const RPCContext = createContext<RPCContextType | null>(null);

const RPCProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [provider, setProvider] = useState<BrowserProvider | null>(null);
	const [address, setAddress] = useState<string>("");
	const [chainId, setChainId] = useState<number>(0);
	const [balance, setBalance] = useState<string>("");

	useEffect(() => {
		if (typeof window.ethereum !== "undefined") {
			window.ethereum.on("accountsChanged", (accounts) => {
				const newAccount = accounts[0] || null;
				setAddress(newAccount);
				getBalance();
				console.log(`accountsChanged: ${newAccount}`);
			});
		}
	}, []);

	const connectWallet = async () => {
		if (typeof window.ethereum !== "undefined") {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const address = await signer.getAddress();
			const chainId = (await provider.getNetwork()).chainId as never;
			setProvider(provider);
			setAddress(address);
			setChainId(chainId);
		}
	};

	const getBalance = async () => {
		if (provider) {
			const balance = await rpc.wallet.getBalance(address, provider);
			setBalance(ethers.parseEther(balance.toString()).toString());
		}
	};

	useEffect(() => {
		(async () => {
			if (typeof window.ethereum !== "undefined") {
				const provider = new ethers.BrowserProvider(window.ethereum);
				const network = await provider.getNetwork();
				setProvider(provider);
				setChainId(network.chainId as any);
				const accounts = await provider.listAccounts();
				if (accounts.length > 0) {
					setAddress(accounts[0].address);
					const balance = await provider.getBalance(accounts[0].address);
					setBalance(ethers.formatEther(balance).toString());
				}
			}
		})();
	}, []);

	const values: RPCContextType = {
		provider,
		address,
		chainId,
		connectWallet,
		balance,
	};

	console.log("RPCProvider.tsx: values", values);

	return <RPCContext.Provider value={values}>{children}</RPCContext.Provider>;
};

export const useRPC = () => {
	const context = useContext<RPCContextType>(RPCContext as any);
	if (!context) {
		throw new Error("useRPC must be used within a RPCProvider");
	}

	return context;
};

export default RPCProvider;
