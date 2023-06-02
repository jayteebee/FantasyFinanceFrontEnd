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
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
}}

// = {
//     user: {
//     name: "Jethro Theodore Block",
//     age: 34,
//     email: "spaceman003@example.com",
//     password: "password",
//     trading_style: "Aggressive",
//     experience_level: "Intermediate",
//     balance: 10000000
//     }
// }

// console.log(createUser());

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