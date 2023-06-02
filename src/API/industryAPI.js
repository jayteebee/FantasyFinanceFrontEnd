import axiosInstance from "./axiosInstance";

export const getAllIndustries = async () => {
    const response = await axiosInstance.get("/industry");
    return response.data;
}

export const getSpecificIndustry = async (IndustryID) => {
    const response = await axiosInstance.get(`/industry/${IndustryID}`);
    return response.data;
}

export const getAllStocksFromIndustry = async (IndustryID) => {
    const response = await axiosInstance.get(`/industry/${IndustryID}/stocks`);
    return response.data;
}

export const getStockFromIndustry = async (IndustryID, stockID) => {
    const response = await axiosInstance.get(`/industry/${IndustryID}/${stockID}`);
    return response.data;
}