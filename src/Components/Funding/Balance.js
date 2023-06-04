import React, {useState, useEffect} from 'react'
import { getAllUserInfo } from '../../API/userAPI'

const Balance = () => {
const [userInfo, setUserInfo] = useState("")
const userID = 1

useEffect(() => {
getAllUserInfo(userID)
.then(data => {
setUserInfo(data)
})
.catch(err => console.log("API Call Failed", err));
}, []);


  return (
<div>
    <div>Balance</div>
      <div>
        {userInfo ? userInfo.balance : <div>Loading...</div>}
      </div>


</div>
  )
}

export default Balance