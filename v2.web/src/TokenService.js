import { ethers } from "ethers";
import MyToken from "./contract/abi.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = "0x9B959594a82eaAC795ec17A3EEe43D94fE7aC23d";
const contract = new ethers.Contract(contractAddress, MyToken.abi, signer);

export const mintTokens = async (userAddress, amount) => {
    try {
        const tx = await contract.mint(userAddress, ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        console.log(`Minted ${amount} tokens to ${userAddress}`);
    } catch (error) {
        console.error("Error minting tokens:", error);
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