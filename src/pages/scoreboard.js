import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import firestore from "../firebase"


export default function Scoreboard(){

      // hooks

    const [data , setData] = useState([]) ;

    useEffect(() => {


    const q = query(collection(firestore , "teachers"));
    
    // Reference to your Firestore collection
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      // Extract data from each document in the collection
      const newData = querySnapshot.docs.map((doc) => doc.data());
      console.log(newData)
      setData(newData)
    })

    // Cleanup function to unsubscribe from updates when the component unmounts
    return () => unsubscribe();


    }, [])// Empty dependency array means this effect runs once on mount


 
    return(
        <>
        <h1>
            This is scoreboard page
        </h1>
        {/* <div>Hello world  Naheed{data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
        </div>   */}

        <h2>User List</h2>
        {data.map((data) => (
        <div key={data.id} className="user-card">
          <h3>{data.name}</h3>
          <p>Email: {data.email}</p>
          <p>Department: {data.department}</p>
          <p>Designation: {data.designation}</p>
          {/* Add more fields as needed */}
          <img src={data.imageUrl} alt={`${data.name}'s avatar`} />
          <p>Reviews Count: {data.reviewsCnt}</p>
          <p>Ratings: {data.ratings}</p>
          {/* Add more user details */}
        </div>
      ))}
        </>


    )


}