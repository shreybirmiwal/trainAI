import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { getStorage, ref, listAll } from "firebase/storage";
import { useState, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { increment } from "firebase/firestore";

const Earn = () => {
    const address = useAddress();
        
    const [allPics, setAllPics] = useState([]);
    const [allIDs, setAllIDs] = useState([]);
    const [currentID, setCurrentID] = useState(0);

    const [userClassification, setUserClassification] = useState('');


    const checkAddressExists = async (cur) => {
        const docRef = doc(db, "data", cur.toString());
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data && data[address]) {
            // Address already exists in the document
            return true;
        } else {
            // Address does not exist in the document
            return false;
        }
    };


    const handleSkip = async () => {
        let cur = (currentID + 1) % allPics.length; //ONLY allow it to go to max length

        // let addressExists = await checkAddressExists(cur);
        // while (addressExists) {
        //     cur = (cur + 1) % allPics.length;
        //     addressExists = await checkAddressExists(cur);
        // }

        setCurrentID(cur);
    };

    const handleSubmit = () => {
        // Logic to submit the input value
        if(userClassification === '') {
            alert('Please enter a classification');
            return;
        }

        console.log(userClassification)


        //give reward

        //update the activeImages
        updateActiveImages()
        updateDataDoc();

        setUserClassification('');

        handleSkip();
    };

    const updateActiveImages = async () => {
        const docRef = doc(db, "activeImages", "0");
        await updateDoc(
            docRef, {
            [`${currentID+1}`]: increment(-1)
        });

        //if the count of the image is 0, delete it from the activeImages
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data[currentID+1] <= 0) {
            await updateDoc(
                docRef, {
                [`${currentID+1}`]: deleteField()
            });
        }
    }
    
    const updateDataDoc = async () => {
        const docRef = doc(db, "data", (currentID+1).toString());
        await setDoc(docRef,{
            [`${address}`]: userClassification
        }, {merge: true}
        );
    
    }


    useEffect(() => {
        getAllImages();
        handleSkip(); //get first valid item
    }, []);

    const getAllImages = async () => {

        //get all active image IDs
        const docRef = doc(db, "activeImages", "0");
        const docSnap = await getDoc(docRef);
        var keys = [];
        if(docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            keys = Object.keys(docSnap.data());
        } else {
            console.log("No such document!");
        }

        //get the images url from storage given the list of active images , 'key
        const storage = getStorage();
        const storageRef = ref(storage);

        var temp = [];
        for (const id of keys) {        
            var fileRef = ref(storageRef, `${id}.jpg`);      
            const url = await getDownloadURL(fileRef);
            //console.log(url);
            temp.push(url);
        }
        setAllPics(temp);
        setAllIDs(keys);
        //console.log("KEY " + keys)
        //console.log(temp)
        return temp;
    }

    const handleUserClassification = (event) => {
        setUserClassification(event.target.value)
    }


    return (
        
        <div className="p-4">

        <h1 className="font-bold text-2xl"> Label data and earn $TAT</h1>

            <input className="border border-gray-300 rounded py-2 px-4 mt-4" type="text" placeholder="What is the image below?" value={userClassification} onChange={handleUserClassification}/>
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit</button>
            <button className="ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSkip}>Skip</button>
            

            <div className="bg-blue-500 w-96 h-96">
                <img className="object-scale-down mt-3" src={allPics[currentID]} alt="Image" />
            </div>

        </div>
    );
};

export default Earn