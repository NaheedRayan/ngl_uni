import { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import firestore from "../firebase"
import {Link, useNavigate} from 'react-router-dom';




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

    const cardClicked = (event , data)=>{
        console.log('Card is clicked and its unique id is '+ data.uniqueId);
      
        
    }

    const navigate = useNavigate();
 
    return(
        <>
        <h1>This is scoreboard page</h1>
        {/* <div>Hello world  Naheed{data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
        </div>   */}
        <h2>User List</h2>
        {data.map((data) => (

                
            <div key={data.uniqueId} className="user-card" onClick={() => {navigate('/comments', {replace:false , state:{data:data}})}}>
              <h3>{data.uniqueId}</h3>
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
        
        ))
        }
        </>


    )


}