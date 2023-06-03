import axiosInstance from "./axiosInstance";
import { axiosInstanceWithToken } from "./axiosInstanceWithToken";

// ** GET REQUESTS ** 

export const getAllUserInfo = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/profile`);
    return response.data;
};

// ** POST REQUESTS ** 


export const createUser = async (userData) => {
    if (!userData) {
        return
    } else {
    console.log("USER DATA: ",userData);
    const response = await axiosInstance.post("/signup",{user: userData});
    console.log("TOKEN: ", response.headers.authorization);
    if (response.headers.authorization) {
        window.localStorage.setItem("token", response.headers.authorization);

    }
    return response.data;
}}

export const logIn = async (logInData) => {
    if (!logInData) {
        return "Please enter a valid username and password"
    } else {
        console.log("LOG IN DATA",logInData)
        const response = await axiosInstance.post("/login", {user: logInData});
        if (response.headers.authorization) {
            // window.localStorage.getItem("token", response.headers.authorization);
            console.log("User Logged In Successfully")
        }
        return response.data;
    }
}

export const currentUser = async () => {
    const response = await axiosInstanceWithToken.get("/current_user");
    return response.data;
}

// console.log("CURRENT USER: ",currentUser());

// ** PUT REQUESTS ** 
export const updateUserInfo = async (userID, userData) => {
    const response = await axiosInstance.put(`/user/${userID}/profile`, userData);
    return response.data;
};

// ** DELETE REQUESTS **

export const deleteUser = async (userID) => {
    const response = await axiosInstance.delete(`/user/${userID}/profile`);
    return response.data;
};