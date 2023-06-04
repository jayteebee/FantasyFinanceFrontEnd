import React, {useState, useEffect} from 'react'
import { getAllUserInfo, updateUserInfo } from '../../API/userAPI'

const PersonalDetails = () => {
    const [userDetails, setUserDetails] = useState({
        name: "",
        age: "",
        email: "",
        trading_style: "",
        experience_level: ""
      })
    const [isEditing, setIsEditing] = useState(false)
    const [updatedUserDetails, setUpdatedUserDetails] = useState({
        name: "",
        age: "",
        email: "",
        trading_style: "",
        experience_level: ""
      })
    const userID = 1
    
    useEffect(() => {
        getAllUserInfo(userID)
        .then(data => {
            if (data) {
        setUserDetails(data)
    }
})
        .catch(err => console.log("API Call Failed", err));
        }, []);


const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUser = await updateUserInfo(userID, updatedUserDetails)
        setUserDetails(updatedUser)
        setIsEditing(false)
    } catch (err) {
        console.log("Error updating user: ", err);
      } finally {
        setUpdatedUserDetails({
          name: "",
          age: "",
          email: "",
          trading_style: "",
          experience_level: ""
        })
      }
}

const handleChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
        [e.target.name]: e.target.value
    })
}

const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setUpdatedUserDetails(userDetails);
}

return (
    <div>
        <h2>personalDetails</h2>
    <div>
        <form onSubmit={handleSubmit}>
        {
            userDetails && (isEditing ? (
            <div>
                <input name='name' value={updatedUserDetails.name} placeholder='Name' onChange={handleChange}></input> <br />
                <input name='age' value={updatedUserDetails.age} placeholder='Age' onChange={handleChange}></input> <br />
                <input name='email' value={updatedUserDetails.email} placeholder='Email' onChange={handleChange}></input> <br />
                <input name='trading_style' value={updatedUserDetails.trading_style} placeholder='Trading Style' onChange={handleChange}></input> <br />
                <input name='experience_level' value={updatedUserDetails.experience_level} placeholder='Experience Level' onChange={handleChange}></input>
                <input type='submit' value='Submit' />
            </div>
        ) : (
            <>
                Name: {userDetails.name } <br />
                Age: {userDetails.age} <br />
                Email: {userDetails.email} <br />
                Trading Style: {userDetails.trading_style} <br />
                Experience Level: {userDetails.experience_level} <br />
                <button onClick={handleUpdateClick}>Update</button>
            </>
        ))}
        </form>   
    </div>
    </div>
    )
    }

export default PersonalDetails