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
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("MY DATA PAGE")
    getOwnedImages();
    //console.log(allPicID);

  }, []);

  const getOwnedImages = async () => {
    const docRef = doc(db, "wallet", "0");
    const docSnap = await getDoc(docRef);

    var allIDs = []

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());

      if (docSnap.data()[`${address}`] !== undefined) {
        allIDs = docSnap.data()[`${address}`]
        setID(docSnap.data()[`${address}`])

        console.log("all ids " + allIDs)
        getAllPics(allIDs)
        getAllData(allIDs)
      }
    } else {
      //console.log("No such document!");
    }
  }

  const getAllPics = async (allIDs) => {

    const storage = getStorage();
    const storageRef = ref(storage);
    const listResult = await listAll(storageRef);
    //console.log(listResult)

    var temp = []

    for (const id of allIDs) {

      var fileRef;
      fileRef = ref(storageRef, `${id}.jpg`);
      const url = await getDownloadURL(fileRef);
      console.log(url);
      temp.push(url);
    }

    setPIC(temp);

  }

  const getAllData = async (allIDs) => {
    var temp = []

    for (const id of allIDs) {
      const docRef = doc(db, "data", `${id}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        //console.log("CUR DUMP! data:", docSnap.data());
        //const justValues = Object.values(docSnap.data())
        //temp.push(docSnap.data());

        const dataString = "" + JSON.stringify(docSnap.data());
        temp.push(dataString)

      } else {
        temp.push(-1) //ERRORR NO SUCH DOC 
        //console.log("No such document!");
      }

    }
    console.log("TEMP AR" + temp)

    setData(temp);

  }

  return (
    <div className='overflow-y-scroll mt-5'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Picture</th>
            <th>Labels</th>
          </tr>
        </thead>
        <tbody>
          {allPicID.map((picID, index) => (
            <tr key={picID}>

              <td>{picID}</td>

              <td>
                <img src={allPicPIC[index]} alt="pic" width={80} height={80} />
              </td>

              <td>{data[index]}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyData;
