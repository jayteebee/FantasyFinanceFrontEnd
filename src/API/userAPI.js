import axiosInstance from "./axiosInstance";

// ** GET REQUESTS ** 

export const getAllUserInfo = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/profile`);
    return response.data;
};

// ** POST REQUESTS ** 

export const createUser = async (userData) => {
    const response = await axiosInstance.post("/user/profile", userData);
    return response.data;
}


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