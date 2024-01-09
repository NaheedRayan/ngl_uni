import { useLocation } from "react-router-dom"


export default function Comments(){

    const location = useLocation() ;

    return(
        <>
        <h1>This is comments page</h1>
        <h3>{location.state.data.uniqueId}</h3>
        <h3>{location.state.data.name}</h3>
        <p>Email: {location.state.data.email}</p>
        <p>Department: {location.state.data.department}</p>
        <p>Designation: {location.state.data.designation}</p>
        {/* Add more fields as needed */}
        <img src={location.state.data.imageUrl} alt={`${location.state.data.name}'s avatar`} />
        <p>Reviews Count: {location.state.data.reviewsCnt}</p>
        <p>Ratings: {location.state.data.ratings}</p>
        {/* Add more user details */}
        </>
    )


}

