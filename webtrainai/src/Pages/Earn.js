import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { useState } from "react";

const Earn = () => {
    const address = useAddress();
    const [imageSrc, setImageSrc] = useState("https://unsplash.com/photos/selective-photography-of-stop-signage-WPrTKRw8KRQhttps://th.bing.com/th/id/R.21657af2c52a35ba82131a2d8fb2c3eb?rik=%2b5Vje1Vg0JpkzA&riu=http%3a%2f%2fwww.aaeyes.net%2fwp-content%2fuploads%2f2018%2f08%2fAttachment-1.jpeg&ehk=W%2fKWcdaxxCi50XSlHE%2bmrRu9pdrchsuvuBigB7suxCc%3d&risl=&pid=ImgRaw&r=0");

    // Function to handle skip button click
    const handleSkip = () => {
        console.log("HI");
    };

    const handleSubmit = () => {
        // Logic to submit the input value
    };

    return (
        
        <div className="p-4">

        <h1 className="font-bold text-2xl"> Label data and earn 10 $TAT</h1>

            <input className="border border-gray-300 rounded py-2 px-4 mt-4" type="text" placeholder="What is the image below?" />
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit</button>
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSkip}>Skip</button>
            

            <div className="bg-blue-500 w-96 h-96">
                <img className="object-scale-down mt-3" src={'PIC.jpg'} alt="Image" />
            </div>

        </div>
    );
};

export default Earn