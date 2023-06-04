import React, {useState, useEffect} from 'react'
import { getAllUserInfo } from '../../API/userAPI'

const PersonalDetails = () => {
    const [userDetails, setUserDetails] = useState("")
    const userID = 1
    
    useEffect(() => {
        getAllUserInfo(userID)
        .then(data => {
        setUserDetails(data)
        })
        .catch(err => console.log("API Call Failed", err));
        }, []);


  return (

<div>

    <h2>personalDetails</h2>
<div>
        {userDetails ? userDetails.name : <div>Loading...</div>} <br />
        {userDetails ? userDetails.age : <div>Loading...</div>} <br />
        {userDetails ? userDetails.email : <div>Loading...</div>} <br />
        {userDetails ? userDetails.trading_style : <div>Loading...</div>} <br />
        {userDetails ? userDetails.experience_level : <div>Loading...</div>}
        </div>

    </div>
  )
}

export default PersonalDetails