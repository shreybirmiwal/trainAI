import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useAddress } from '@thirdweb-dev/react';
import { listAll } from 'firebase/storage';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

function MyData() {

  const address = useAddress();
  const [allPicID, setID] = useState([]);  //the id, ei: 1, 2
  const [allPicPIC, setPIC] = useState([]); //the actual picture

  useEffect(() => {
    getOwnedImages();
    console.log(allPicID);

  }, []);

  const getOwnedImages = async () => {
    const docRef = doc(db, "wallet", "0");
    const docSnap = await getDoc(docRef);

    var allIDs = []
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      if(docSnap.data()[`${address}`] !== undefined) {
        allIDs = docSnap.data()[`${address}`]
        setID(docSnap.data()[`${address}`])
        getAllPics(allIDs)
      }
    } else {
      console.log("No such document!");
    }
  }

  const getAllPics = async (allIDs) => {

    const storage = getStorage();
    const storageRef = ref(storage);
    const listResult = await listAll(storageRef);
    console.log(listResult)

    for (const id of allIDs) {

      var fileRef;
      fileRef = ref(storageRef, `${id}.jpg`);      
      const url = await getDownloadURL(fileRef);
      console.log(url);
    }    
    
  }

  return (
    <div>
      {allPicID.map((picID) => (
        <p key={picID}>{picID}</p>
      ))}
    </div>
  );
}

export default MyData;
