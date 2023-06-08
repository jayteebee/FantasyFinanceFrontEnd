import React, { useState, useEffect } from "react";
import { getAllUserInfo, updateUserInfo } from "../../API/userAPI";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { deleteEntireProfile } from "../../API/userAPI";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

const PersonalDetails = () => {
  const userID = window.localStorage.getItem("userID");

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
  };
  const deleteProfile = async () => {
    const deleteUsersProfile = await deleteEntireProfile(userID);
    console.log(deleteUsersProfile);
    navigateToLogin();
  };

  return (
    <div>
      <Row>
        <Col>
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                {userDetails &&
                  (isEditing ? (
                    <div className="p-5">
                      <div className="me-1">
                        <div
                          className="square border border-warning rounded p-5"
                          style={{ width: "50vh" }}
                        >
                          <Form.Control
                            name="name"
                            value={updatedUserDetails.name}
                            placeholder="Name"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="age"
                            value={updatedUserDetails.age}
                            placeholder="Age"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="email"
                            value={updatedUserDetails.email}
                            placeholder="Email"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="trading_style"
                            value={updatedUserDetails.trading_style}
                            placeholder="Trading Style"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="experience_level"
                            value={updatedUserDetails.experience_level}
                            placeholder="Experience Level"
                            onChange={handleChange}
                          ></Form.Control>
                          <Form.Control
                            name="card_type"
                            value={updatedUserDetails.card_type}
                            placeholder="Card Type"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="firstname"
                            value={updatedUserDetails.firstname}
                            placeholder="First Name"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="lastname"
                            value={updatedUserDetails.lastname}
                            placeholder="Last Name"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="cc"
                            value={updatedUserDetails.cc}
                            placeholder="Card Number"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="valid_date"
                            value={updatedUserDetails.valid_date}
                            placeholder="Valid Date"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <Form.Control
                            name="cvc"
                            value={updatedUserDetails.cvc}
                            placeholder="CVC"
                            onChange={handleChange}
                          ></Form.Control>{" "}
                          <br />
                          <Button type="submit" value="Submit">
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5">
                      <div className="me-1">
                        <div
                          className="square border border-warning rounded p-5"
                          style={{ width: "30vw" }}
                        >
                          <h2>Personal Details</h2>
                          Name: {userDetails.name} <br />
                          Age: {userDetails.age} <br />
                          Email: {userDetails.email} <br />
                          Trading Style: {userDetails.trading_style} <br />
                          Experience Level: {userDetails.experience_level}{" "}
                          <br />
                          Card Type: {userDetails.card_type} <br />
                          First Name: {userDetails.firstname} <br />
                          Last Name: {userDetails.lastname} <br />
                          Card Number: {userDetails.cc} <br />
                          Valid Date: {userDetails.valid_date} <br />
                          <Button onClick={handleUpdateClick}>Update</Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Col>
          <div className="p-5">
            <div className="me-1">
              <div className=" square border border-warning rounded p-5">
                <h2>WARNING</h2>
                <p>
                  Deleting your account will result in all trades being closed
                  before the start of the next trading day. You will not be able
                  to choose at what price they are sold, nor will you have any
                  say in whether the trade covers your principal investment.
                </p>

                <p>
                  All remaining funds will be deposited into your account within
                  3 to 5 working days and then your account will be officially
                  closed. In the mean time your account will be frozen, no
                  transactions may take place, no funds may be deposited or
                  withdrawn.
                </p>
                <p>
                  Any and all fees will be subtracted from your remaining
                  balance before you receive your funds.
                </p>
                <Button variant="danger" onClick={deleteProfile}>
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PersonalDetails;
