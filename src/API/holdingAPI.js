import axiosInstance from "./axiosInstance";

// ** GET REQUESTS ** 

export const getAllUserHoldings = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/holdings`);
    return response.data;
}

export const getSpecificUserHolding = async (userID, holdingID) => {
    const response = await axiosInstance.get(`/user/${userID}/holdings/${holdingID}`);
    return response.data;
}

// ** POST REQUESTS ** 

export const createHolding = async (userID, holdingData) => {
    const response = await axiosInstance.post(`/user/${userID}/holdings`, holdingData);
    return response.data;
}