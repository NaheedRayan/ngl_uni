import { collection, onSnapshot, query } from 'firebase/firestore';
import './App.css';
import firestore from "./firebase"
import { useEffect, useState } from 'react';



import { getAuth, signInAnonymously , onAuthStateChanged } from "firebase/auth";

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Scoreboard from './pages/scoreboard';
import Comments from './pages/comments' ;
import Form from './pages/form';






function App() {
  // hooks

  const [data , setData] = useState([]) ;

  useEffect(() => {


    const q = query(collection(firestore , "user"));
    
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


 





  ///////////////////////////////////////////////////////////

  const auth = getAuth();
  signInAnonymously(auth)
  .then(() => {
    // Signed in..
    // console.log("Hello wold")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // console.log(uid)
    // ...
  } else {
    // User is signed out
    // ...
  }
});
  
  
  return (
    <div className="App">
      {/* <div>Hello world  Naheed{data.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
      ))}
      </div>  */}


      <BrowserRouter>
      <Routes>
        <Route index element={<Scoreboard/>}/>
        <Route path='/scoreboard' element={<Scoreboard/>}/>
        <Route path='/comments' element={<Comments/>}/>
        <Route path='/form' element={<Form/>}/>


      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
