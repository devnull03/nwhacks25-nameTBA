import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	solidity: "0.8.28",
	networks: {
		sepolia: {
			accounts: [""],
			url: "https://eth-sepolia.g.alchemy.com/v2/f6VE6onWndblaVinos8SYCYxq5vvfQkK",
		},
	},
};

export default config;
