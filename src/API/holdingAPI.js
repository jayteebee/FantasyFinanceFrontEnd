import axiosInstance from "./axiosInstance";

export const getAllUserHoldings = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/holdings`);
    return response.data;
}

export const getSpecificUserHolding = async (userID, holdingID) => {
    const response = await axiosInstance.get(`/user/${userID}/holdings/${holdingID}`);
    return response.data;
}