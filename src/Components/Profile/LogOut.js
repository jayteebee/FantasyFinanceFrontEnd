import React  from 'react'
import Button from 'react-bootstrap/esm/Button'
import { deleteUser } from '../../API/userAPI'
import { useNavigate } from "react-router-dom";


const LogOut = ({setUpdatedBalance, setShowRegister}) => {
const userID = window.localStorage.getItem("userID")

const navigate = useNavigate();


const logOut = () => {
deleteUser(userID)
navigate("/login");
setUpdatedBalance((prevState) => !prevState);
setShowRegister(true)
}

  return (
    <div>
    <Button onClick={logOut}>LogOut</Button>
    </div>
  )
}

export default LogOut