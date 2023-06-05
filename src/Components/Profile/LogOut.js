import React from 'react'
import Button from 'react-bootstrap/esm/Button'
import { deleteUser } from '../../API/userAPI'

const LogOut = () => {
const userID = window.localStorage.getItem("userID")

const logOut = () => {
deleteUser(userID)
}

  return (
    <div>
    <Button onClick={logOut}>LogOut</Button>
    </div>
  )
}

export default LogOut