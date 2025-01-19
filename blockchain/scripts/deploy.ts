import hre from "hardhat";
const { ethers } = hre;

async function deploy() {
	const [deployer] = await ethers.getSigners();
	// get the chain Id
	const network = await deployer.provider.getNetwork();
	const chainId = network.toJSON()?.chainId;

	const BetFactory = await ethers.getContractFactory("BetFactory");
	const betFactory = await BetFactory.deploy(deployer.address);
	await betFactory.waitForDeployment();

	console.log(betFactory.deploymentTransaction());
	console.log(`BetFactory deployed to: ${await betFactory.getAddress()}`);
}
deploy()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
