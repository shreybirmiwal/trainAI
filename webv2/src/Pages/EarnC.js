import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { getStorage, ref, listAll } from "firebase/storage";
import { useState, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";
import { get } from "http";

const EarnC = () => {
    const address = useAddress();

    const [pics, setPics] = useState({});
    const [available, setAvailable] = useState([]);
    const [currentID, setCurrentID] = useState(0);

    useEffect(() => {
        onLoad();
    }, []);

    const onLoad = async () => {
        //we must get the URLS of all items and create a dictionary: {picture id: picture url}
        const storage = getStorage();
        const storageRef = ref(storage);
        const listResult = await listAll(storageRef);

        var temp = {}

        for (const item of listResult.items) {
            const url = await getDownloadURL(item);
            const name = item.name.split('.')[0]

            temp[name] = url
        }
        console.log("ALL IMAGES")
        console.log(temp)
        setPics(temp)



        //get all available pics
        const docRef = doc(db, "activeImages", "0");
        const docSnap = await getDoc(docRef);
        var keys = [];
        if (docSnap.exists()) {
            keys = Object.keys(docSnap.data());
        }
        console.log("AVAILABLE IMAGES IDs")
        console.log(keys)
        setAvailable(keys)


        setCurrentID(keys[Math.floor(Math.random() * keys.length)])
        console.log("CURRENT ID: " + currentID)
    }


    const [userClassification, setUserClassification] = useState('');
    const handleUserClassification = (event) => {
        setUserClassification(event.target.value);
    }
    const handleSkip = async () => {
        console.log("OLD ID: " + currentID)
        setCurrentID(available[Math.floor(Math.random() * available.length)])
        console.log("NEW ID: " + currentID)
    }

    const handleSubmit = () => {

        if (userClassification === '') {
            alert('Please enter a classification');
            return;
        }

        console.log(userClassification)

        //give reward

        //update firebase images
        updateActiveImages();
        updateDataDoc();

        setUserClassification('');
        handleSkip();
    }






    const updateActiveImages = async () => {
        const docRef = doc(db, "activeImages", "0");
        await updateDoc(
            docRef, {
            [`${currentID}`]: increment(-1)
        });

        //if the count of the image is 0, delete it from the activeImages
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data[currentID] <= 0) {
            await updateDoc(
                docRef, {
                [`${currentID}`]: deleteField()
            });
        }

        onLoad()
    }

    const updateDataDoc = async () => {
        const docRef = doc(db, "data", (currentID).toString());
        await setDoc(docRef, {
            [`${address}`]: userClassification
        }, { merge: true }
        );

    }




    return (

        <div className="p-4">

            <h1 className="font-bold text-2xl"> Label data and earn $TAT</h1>

            <input className="border border-gray-300 rounded py-2 px-4 mt-4" type="text" placeholder="What is the image below?" value={userClassification} onChange={handleUserClassification} />
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit</button>
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSkip}>Skip</button>


            <div className="bg-blue-500 w-96 h-96">
                <img className="object-scale-down mt-3" src={pics[currentID]} alt="Image" />
                <p> Current ID: {currentID}</p>
            </div>


        </div>
    );
};

export default EarnC