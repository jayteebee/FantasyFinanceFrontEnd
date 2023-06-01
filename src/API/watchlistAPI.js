import axiosInstance from "./axiosInstance";

// ** GET REQUESTS ** 

export const getAllUserWatchlists = async (userID) => {
    const response = await axiosInstance.get(`/user/${userID}/watchlist`);
    return response.data;
}

export const getSpecificUserWatchlist = async (userID, watchlistID) => {
    const response = await axiosInstance.get(`/user/${userID}/watchlist/${watchlistID}`);
    return response.data;
}

export const getStocksFromWatchlist = async (userID, watchlistID) => {
    const response = await axiosInstance.get(`/user/${userID}/watchlist/${watchlistID}/stocks`);
    return response.data;
}

export const getSpecificStockFromWatchlist = async (userID, watchlistID, stockTicker) => {
    const response = await axiosInstance.get(`/user/${userID}/watchlist/${watchlistID}/${stockTicker}`);
    return response.data;
}

// ** POST REQUESTS **

export const createWatchlist = async (userID, watchlistData) => {
    const response = await axiosInstance.post(`/user/${userID}/watchlist`, watchlistData);
    return response.data;
}

export const addStockToWatchlist = async (userID, watchlistID, stockTicker) => {
    const response = await axiosInstance.post(`/user/${userID}/watchlist/${watchlistID}/${stockTicker}`);
    return response.data;
}

// ** DELETE REQUESTS **

export const deleteWatchlist = async (userID, watchlistID) => {
    const response = await axiosInstance.delete(`/user/${userID}/watchlist/${watchlistID}`);
    return response.data;
}