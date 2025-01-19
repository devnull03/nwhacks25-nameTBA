/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserProvider, ethers } from "ethers";
import getBetFactoryContract from "./getBetFactoryContract";

export default async function deployBet(
	address1: string,
	address2: string,
	amount: bigint,
	provider: BrowserProvider
) {
	try {
		const signer = await provider.getSigner();

		const betFactoryContract = await getBetFactoryContract(provider);
		const tx = await betFactoryContract
			.connect(signer)
			.deployBet(
				address1,
				address2,
				ethers.parseEther(amount.toString()),
				false
			);

		await tx.wait();

		const betCount = await betFactoryContract.betCount();
		const betId = parseInt(betCount.toString()) - 1;

		console.log(`Bet deployed with ID: ${betId}`);
		return betId;
	} catch (error: any) {
		console.error("Error deplying a bet", error);
		throw new Error(`Failed to deploy a bet: ${error.message}`);
	}
}
