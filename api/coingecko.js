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
            price_change_percentage: "7d",
            sparkline: true
        }
    });

    return result.data;
};


// Single coin data
export const getCoinData = async (selectedCurrency, coinId) => {

    const result = await axios.get(COINGECKO_API_URL + "/coins/markets", {
        params: {
            ids: coinId,
            vs_currency: selectedCurrency,
            sparkline: true
        }
    });

    return result.data;
};


/// chart

export const generatePriceChart = async (selectedCurrency, coinId) => {

    const result = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}/market_chart`, {
        params: {
            vs_currency: selectedCurrency,
            days: 1,
            precision: 2
        }
    });

    return result.data;
}