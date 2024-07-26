import { ethers } from "ethers";
import MyToken from "./contract/abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0x53AcD54CE3F08807121524C2A08c74504c5D071e";
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