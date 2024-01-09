import { addDoc, collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import './App.css';
import firestore from "./firebase"
import { useEffect, useState } from 'react';



import { getAuth, signInAnonymously , onAuthStateChanged } from "firebase/auth";

import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Scoreboard from './pages/scoreboard';
import Comments from './pages/comments' ;
import Form from './pages/form';



  ///////////////////////////for anonymous auth////////////////////////////////
  const auth = getAuth();

  signInAnonymously(auth)
  .then(() => {
    // Signed in..
    console.log("Signed In")
    console.log(auth.currentUser.uid)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });





function App() {
  // hooks
  const [signedIn , setSignedIn] = useState(false);


  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // const uid = user.uid;
      // console.log(uid)
      setSignedIn(true)
      try {

        const docRef = await setDoc(doc(firestore , 'user' , user.uid),{
          uid:user.uid,
          reviewsCnt:0,
          replyCnt:0,
          commentTimestamp:[],
          replyTimestamp:[],
        })
    
        console.log('Document written with ID: ',  user.uid);


      } catch (error) {
        console.error('Error adding document: ', error);
      }

      // ...
    } else {
      // User is signed out
      setSignedIn(false)
      // ...
    }
  });

 

// if the user is signed in then we will render
  if(signedIn){
    return (
      <div className="App">
        {/* router for different pages */}
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
  else{
// else will show 404 page
    return(
      <div className='App'>
        <h3>404 😔 something went wrong</h3>
      </div>
    )
  }

}

export default App;
