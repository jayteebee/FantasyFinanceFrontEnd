import axiosInstance from "../axiosInstance";

export const news = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/news`);
    return response.data;
};

export const overview = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/overview`);
    return response.data;
};

export const incomeStatement = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/income_statement`);
    return response.data;
};

export const balanceSheet = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/balance_sheet`);
    return response.data;
};

export const cashFlow = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/cash_flow`);
    return response.data;
};

export const earnings = async (userID, tickerSymbol) => {
    const response = await axiosInstance.get(`/user/${userID}/stocks/${tickerSymbol}/earnings`);
    return response.data;
}