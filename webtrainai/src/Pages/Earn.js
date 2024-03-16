import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";

const Earn = () => {
    const address = useAddress();
    const [imageSrc, setImageSrc] = useState("https://source.unsplash.com/random");

    // Function to handle skip button click
    const handleSkip = () => {
        setImageSrc("https://source.unsplash.com/random");
        console.log("HI");
    };

    const handleSubmit = () => {
        // Logic to submit the input value
    };

    return (
        <div>
            {address ? (
                <div>
                    <h1>Address: {address}</h1>
                    <button onClick={handleSkip}>Skip</button>
                    <input type="text" placeholder="What is the image above?" />
                    <button onClick={handleSubmit}>Submit</button>
                    <img src={imageSrc} alt="Image" />
                </div>
            ) : (
                <h1>Connect Wallet</h1>
            )}
            <ConnectWallet />
        </div>
    );
};

export default Earn