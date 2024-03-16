import React, { useState } from 'react';
import { db } from '../firebase';
import { storage } from '../firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { useAddress } from '@thirdweb-dev/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Buy = () => {

    const address = useAddress();

    const [files, setFiles] = useState([]);
    const [number, setNumber] = useState('');

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
    };

    const handleNumberChange = (event) => {
        const selectedNumber = event.target.value;
        setNumber(selectedNumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Create a Firebase Storage reference
        const storage = getStorage();
        const storageRef = ref(storage);

        // Get the number of items in the storage reference
        const listResult = await listAll(storageRef);
        const numberOfItems = listResult.items.length;
        console.log('Number of items:', numberOfItems);
    
        // Upload each file and change its name
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const newFileName = `${i + 1 + numberOfItems }.${file.name.split('.').pop()}`; // Change the file name to 1, 2, 3, etc.
    
            // Upload the file to Firebase Storage
            const fileRef = ref(storageRef, newFileName);
            await uploadBytes(fileRef, file);
    
            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(fileRef);
            console.log(`Uploaded file ${i + 1}: ${downloadURL}`);
        }

        updateOwnedItems(1+numberOfItems, 1+numberOfItems+files.length)        

        console.log('Number:', number);
    };

    const updateOwnedItems = async (min, max) => {
        const docRef = doc(db, "wallet", "0");
        const docSnap = await getDoc(docRef);

        var curData = []

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());

          if(docSnap.data()[`${address}`] !== undefined) {
            curData = docSnap.data()[`${address}`]
            console.log("AHS data:", curData)
          }

        } else {
          console.log("No such document!");
        }

        for (let i = min; i < max; i++) {
            curData.push(i);
        }
        
        await updateDoc(docRef, {
            [`${address}`]: curData
        });
    }
    

    return (
        <div>
            <h1>Buy Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fileInput">Upload Images:</label>
                    <input type="file" id="fileInput" onChange={handleFileChange} accept="image/*" multiple />
                </div>
                <div>
                    <label htmlFor="numberInput">How many times should each image be labeled?</label>
                    <input type="number" id="numberInput" value={number} onChange={handleNumberChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Buy;

