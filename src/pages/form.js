// Form.js
import { useState } from 'react';
import { collection, addDoc, serverTimestamp, updateDoc ,doc} from 'firebase/firestore';
import firestore from "../firebase"


const Form = () => {

  const [uniqueId, setUniqueId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [reviewsCnt, setReviewsCnt] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, 'teachers'), {
        uniqueId,
        name,
        email,
        department,
        designation,
        imageUrl,
        createdAt: serverTimestamp(),
        reviewsCnt,
        reviews,
        ratings,
      });

      console.log('Document written with ID: ', docRef.id);
      // You can perform any additional actions after successful data save

      await updateDoc(doc(firestore , "teachers" , docRef.id),{
        uniqueId:docRef.id ,
      });

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Unique ID:
        <input type="text" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} />
      </label>
      <br />
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Department:
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
      </label>
      <br />
      <label>
        Designation:
        <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
      </label>
      <br />
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <br />
      <label>
        Reviews Count:
        <input type="number" value={reviewsCnt} onChange={(e) => setReviewsCnt(e.target.value)} />
      </label>
      <br />
      {/* You can add more input fields for other properties as needed */}
      <button type="submit">Save Data</button>
    </form>
  );
};

export default Form;
