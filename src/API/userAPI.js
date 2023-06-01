import axiosInstance from "./axiosInstance";

export const getAllUserInfo = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/profile`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axiosInstance.post("/user/profile", userData);
    return response.data;
}
