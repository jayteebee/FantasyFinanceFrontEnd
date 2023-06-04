import React, { useState, useEffect } from "react";
import { createUser } from "../API/userAPI";
import { logIn } from "../API/userAPI";

const SignUpSignIn = () => {

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
  };

  return (
    <div>
      <div>SignUpSignIn</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input.name}
          name="name"
          placeholder="Username"
          onChange={handleChange}
        />
        <input
          type="text"
          value={input.age}
          name="age"
          placeholder="Age"
          onChange={handleChange}
        />
        <input
          type="text"
          value={input.email}
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <input
          type="text"
          value={input.password}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input type="submit" value="Sign Up" />
      </form>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={input2.name}
          name="name"
          placeholder="Username"
          onChange={handleChangeLI}
        />
        <input
          type="text"
          value={input2.age}
          name="age"
          placeholder="Age"
          onChange={handleChangeLI}
        />
        <input
          type="text"
          value={input2.email}
          name="email"
          placeholder="E-mail"
          onChange={handleChangeLI}
        />
        <input
          type="text"
          value={input2.password}
          name="password"
          placeholder="Password"
          onChange={handleChangeLI}
        />

        <input type="submit" value="Sign In" />
      </form>
    </div>
  );
};

export default SignUpSignIn;
