import axios from "axios";

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
console.log("COINGECKO_API_URL:"+ COINGECKO_API_URL);

// All coins data
export const getCoinsData = async (selectedCurrency, page, perPage) => {

    const result = await axios.get(COINGECKO_API_URL + "/coins/markets", {
        params: {
            vs_currency: selectedCurrency,
            page,
            per_page: perPage,
        }
    });

    return result.data;
};


// Single coin data
export const getCoinData = async (selectedCurrency, coinId) => {

    const result = await axios.get(COINGECKO_API_URL + "/coins/markets", {
        params: {
            ids: coinId,
            vs_currency: selectedCurrency
        }
    });

    return result.data;
};


/// chart

export const generatePriceChart = async (selectedCurrency, coinId) => {

    const result = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: selectedCurrency,
            days: 7
        }
    });

    return result.data;
}