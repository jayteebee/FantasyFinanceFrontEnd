import React, { useState, useEffect } from "react";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";
import Button from "react-bootstrap/esm/Button";
import { deleteEntireProfile } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";

const PersonalDetails = () => {
  const userID =  window.localStorage.getItem("userID");

  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    trading_style: "",
    experience_level: "",
    card_type: "",
    firstname: "",
    lastname: "",
    cc: "",
    valid_date: "",
    cvc: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    name: "",
    age: "",
    email: "",
    trading_style: "",
    experience_level: "",
    card_type: "",
    firstname: "",
    lastname: "",
    cc: "",
    valid_date: "",
  });


  useEffect(() => {
    getAllUserInfo(userID)
      .then((data) => {
        if (data) {
          setUserDetails(data);
        }
      })
      .catch((err) => console.log("API Call Failed", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUserInfo(userID, updatedUserDetails);
      setUserDetails(updatedUser);
      setIsEditing(false);
    } catch (err) {
      console.log("Error updating user: ", err);
    } finally {
      setUpdatedUserDetails({
        name: "",
        age: "",
        email: "",
        trading_style: "",
        experience_level: "",
      });
    }
  };

  const handleChange = (e) => {
    setUpdatedUserDetails({
      ...updatedUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
    setUpdatedUserDetails(userDetails);
  };

  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  }
const deleteProfile = async () => {
  const deleteUsersProfile = await deleteEntireProfile(userID);
  console.log(deleteUsersProfile);
  navigateToLogin()
}


  return (
    <div>
      <h2>personalDetails</h2>
      <div>
        <form onSubmit={handleSubmit}>
          {userDetails &&
            (isEditing ? (
              <div>
                <input
                  name="name"
                  value={updatedUserDetails.name}
                  placeholder="Name"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="age"
                  value={updatedUserDetails.age}
                  placeholder="Age"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="email"
                  value={updatedUserDetails.email}
                  placeholder="Email"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="trading_style"
                  value={updatedUserDetails.trading_style}
                  placeholder="Trading Style"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="experience_level"
                  value={updatedUserDetails.experience_level}
                  placeholder="Experience Level"
                  onChange={handleChange}
                ></input>
                <br />
                <input
                  name="card_type"
                  value={updatedUserDetails.card_type}
                  placeholder="Card Type"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="firstname"
                  value={updatedUserDetails.firstname}
                  placeholder="First Name"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="lastname"
                  value={updatedUserDetails.lastname}
                  placeholder="Last Name"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="cc"
                  value={updatedUserDetails.cc}
                  placeholder="Card Number"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="valid_date"
                  value={updatedUserDetails.valid_date}
                  placeholder="Valid Date"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input
                  name="cvc"
                  value={updatedUserDetails.cvc}
                  placeholder="CVC"
                  onChange={handleChange}
                ></input>{" "}
                <br />
                <input type="submit" value="Submit" />
              </div>
            ) : (
              <div>
                Name: {userDetails.name} <br />
                Age: {userDetails.age} <br />
                Email: {userDetails.email} <br />
                Trading Style: {userDetails.trading_style} <br />
                Experience Level: {userDetails.experience_level} <br /> 
                Card Type: {userDetails.card_type} <br />
                First Name: {userDetails.firstname} <br />
                Last Name: {userDetails.lastname} <br />
                Card Number: {userDetails.cc} <br />
                Valid Date: {userDetails.valid_date} <br />
                <Button onClick={handleUpdateClick}>Update</Button>
                
              </div>
            ))}
        </form>
      </div>
      <Button variant="danger" onClick={deleteProfile}>Delete Account</Button>
    </div>
  );
};

export default PersonalDetails;
