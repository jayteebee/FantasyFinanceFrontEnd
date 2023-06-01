import axiosInstance from "./axiosInstance";

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