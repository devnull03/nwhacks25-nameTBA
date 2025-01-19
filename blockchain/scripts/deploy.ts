import hre from "hardhat";
const { ethers } = hre;

async function deploy() {
	const [deployer] = await ethers.getSigners();
	// get the chain Id
	const network = await deployer.provider.getNetwork();
	const chainId = network.toJSON()?.chainId;

	const balance = await deployer.provider.getBalance(deployer.address);
	console.log(`Deployer balance: ${ethers.formatEther(balance)} ETH`);
	console.log(`Deploying contracts with account: ${deployer.address}`);
	const BetFactory = await ethers.getContractFactory("BetFactory");
	const betFactory = await BetFactory.deploy(deployer.address);
	await betFactory.waitForDeployment();

	console.log(betFactory.deploymentTransaction());
	console.log(`BetFactory deployed to: ${await betFactory.getAddress()}`);

	//sepolia: 0x444215c3258cE8c0069E48127F21DA4808C67F65
}
deploy()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
