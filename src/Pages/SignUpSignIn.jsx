import React, { useState, useEffect } from "react";
import { createUser } from "../API/userAPI";
import { logIn } from "../API/userAPI";
import { useNavigate } from "react-router-dom";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

const SignUpSignIn = ({ showRegister, setShowRegister }) => {
  const navigate = useNavigate();
  // STATE
  const [input, setInput] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [input2, setInput2] = useState({
    name: "",
    age: "",
    email: "",
    password: "",
  });

  const [user, setUser] = useState({});
  const [user2, setUser2] = useState({});

  // FUNCTIONS

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeLI = (e) => {
    setInput2({
      ...input2,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser(input);
      setUser(newUser);
    } catch (err) {
      console.log("Error creating user: ", err);
    } finally {
      setInput({
        name: "",
        age: "",
        email: "",
        password: "",
      });
    }
    setShowRegister(true)
    navigate("/login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const newLogin = await logIn(input2);
      setUser2(newLogin);
    } catch (err) {
      console.log("Error creating user: ", err);
    } finally {
      setInput2({
        name: "",
        age: "",
        email: "",
        password: "",
      });
    }
    navigate("/");
  };

  const showRegistration = () => {
    setShowRegister(false);
  };

  return (
    <div>
      {showRegister ? (
        // SIGN IN
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={handleLogin}>
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput
                  type="text"
                  value={input2.name}
                  name="name"
                  placeholder="First Name"
                  onChange={handleChangeLI}
                  label="First name"
                />
              </MDBCol>

              <MDBCol>
                <MDBInput
                  type="text"
                  value={input2.age}
                  name="age"
                  placeholder="Age"
                  onChange={handleChangeLI}
                  label="Age"
                />
              </MDBCol>
            </MDBRow>

            <MDBInput
              className="mb-4"
              type="email"
              value={input2.email}
              name="email"
              placeholder="E-mail"
              onChange={handleChangeLI}
              label="Email address"
            />

            <MDBInput
              className="mb-4"
              type="password"
              id="form3Example"
              value={input2.password}
              name="password"
              placeholder="Password"
              onChange={handleChangeLI}
              label="Password"
            />

            <MDBBtn type="submit" value="Sign In" className="mb-4" block>
              Sign in
            </MDBBtn>

            <div className="text-center">
              <p>
                Not a member?{" "}
                <MDBBtn onClick={showRegistration}>Register</MDBBtn>
              </p>

              <p>or sign up with:</p>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="google" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="github" />
              </MDBBtn>
            </div>
          </form>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <form onSubmit={handleSubmit}>
            <MDBRow className="mb-4">
              <MDBCol>
                <MDBInput
                  type="text"
                  value={input.name}
                  name="name"
                  placeholder="Username"
                  onChange={handleChange}
                  label="First name"
                />
              </MDBCol>

              <MDBCol>
                <MDBInput
                  type="text"
                  value={input.age}
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  label="Age"
                />
              </MDBCol>
            </MDBRow>

            <MDBInput
              className="mb-4"
              type="email"
              value={input.email}
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              label="Email address"
            />

            <MDBInput
              className="mb-4"
              
              type="password"
              value={input.password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              label="Password"
            />

            <MDBBtn type="submit" value="Register" className="mb-4" block>
              Register
            </MDBBtn>

            <p>
            Already a member?
            <MDBBtn onClick={() => setShowRegister(false)}>Sign In</MDBBtn>  
           </p>

            <div className="text-center">
              <p>or sign up with:</p>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="google" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>
              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="github" />
              </MDBBtn>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpSignIn;
