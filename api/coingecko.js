import axios from "axios";

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;

console.log("COINGECKO_API_URL:"+ COINGECKO_API_URL);
console.log("the api url:" + COINGECKO_API_URL)

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


