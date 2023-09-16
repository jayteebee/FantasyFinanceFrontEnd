import axiosInstance from "./axiosInstance";
import { axiosInstanceWithToken } from "./axiosInstanceWithToken";

// ** GET REQUESTS **

export const getAllUserInfo = async (userID) => {
  const response = await axiosInstance.get(`/user/${userID}/profile`);
  return response.data;
};

export const currentUser = async () => {
  const token = window.localStorage.getItem("token");
  const response = await axiosInstance.get("/current_user", {
    headers: {
      Authorization: token,
    },
  });
  const userID = window.localStorage.getItem("userID");
  console.log("USERID: ", userID);
  return userID;
};

// console.log("CURRENT USER: ", currentUser());

// ** POST REQUESTS ***

export const createUser = async (userData) => {
  if (!userData) {
    return;
  } else {
    console.log("USER DATA: ", userData);
    const response = await axiosInstance.post("/signup", { user: userData });
    // console.log("TOKEN: ", response.headers.authorization);
    if (response.headers.authorization) {
      window.localStorage.setItem("token", response.headers.authorization);
    }
    return response.data;
  }
};

export const logIn = async (logInData) => {
  if (!logInData) {
    return "Please enter a valid username and password";
  } else {
    const response = await axiosInstance.post("/login", { user: logInData });
    if (response.headers.authorization) {
      window.localStorage.setItem("token", response.headers.authorization);
      window.localStorage.setItem("userID", response.data.data.id);
      console.log("User Logged In Successfully");
    }
    return response.data;
  }
};

// ** PUT REQUESTS **
export const updateUserInfo = async (userID, userData) => {
  const response = await axiosInstance.put(`/user/${userID}/profile`, userData);
  return response.data;
};

// ** DELETE REQUESTS **

export const deleteUser = async (userID) => {
  try {
  const response = await axiosInstanceWithToken.delete(
    `/logout`
  );
  console.log("Successful Log Out");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userID");
  return response.data;
} catch (error) {
  console.error(error);
  throw error;
}
};

// console.log("DELETED USER REQUEST:", deleteUser(76))

export const deleteEntireProfile = async (userID) => {
  const response = await axiosInstanceWithToken.delete(
    `/user/${userID}/profile`
  );
  console.log("Successful Account Obliteration");
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userID");
  return response.data;
}

