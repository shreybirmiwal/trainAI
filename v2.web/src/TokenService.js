import { ethers } from "ethers";
import MyToken from "./contract/abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0x85066324CD3bAABEaA26CfF6957215eBC9fd75bD";
const contract = new ethers.Contract(contractAddress, MyToken.abi, signer);

export const rewardUser = async (userAddress, amount) => {
    try {
        const tx = await contract.reward(userAddress, ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log(`Rewarded ${amount} tokens to ${userAddress}`);
    } catch (error) {
        console.error("Error rewarding user:", error);
    }
};

export const collectFromUser = async (userAddress, amount) => {
    try {
        const tx = await contract.collect(userAddress, ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log(`Collected ${amount} tokens from ${userAddress}`);
    } catch (error) {
        console.error("Error collecting from user:", error);
    }
};

export const getContractBalance = async () => {
    try {
        const balance = await provider.getBalance(contractAddress);
        return ethers.utils.formatEther(balance);
    } catch (error) {
        console.error("Error getting contract balance:", error);
    }
};