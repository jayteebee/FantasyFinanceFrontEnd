import axiosInstance from "../axiosInstance";

export const timeSeriesIntraday = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/time_series_intraday`);
    return response.data;
};

export const tickerSearch = async (userID, companyName) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${companyName}/ticker_search`);
    return response.data;
}