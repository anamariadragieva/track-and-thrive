import "./config/env.js";

import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';

// api
import { getCoinsData } from "./api/coingecko.js";
import { getCoinData } from "./api/coingecko.js";
import { generatePriceChart } from "./api/coingecko.js";


const COINGECKO_API_URL = process.env.COINGECKO_API_URL;
console.log("the api url:" + COINGECKO_API_URL)

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use(express.urlencoded({ extended: true }));


// Use routes (apply routes to paths)
// app.use('/', homeRoutes);  // When someone visits '/', use homeRoutes
// app.use('/portfolio', portfolioRoutes);  // When someone visits '/portfolio', use portfolioRoutes

// Home route
app.get("/", async (req, res) => {
  const supportedCurrencies = ["usd", "eur", "gbp", "aud", "cad", "aed", "jpy", "nzd"];
  const selectedCurrency = req.query.currency || "usd";
  const currenciesSymbols = {
    usd: "$",
    eur: "€", 
    gbp: "£", 
    aud: "AU$", 
    cad: "CA$", 
    aed: "د.إ", 
    jpy: "¥", 
    nzd: "NZ$"
    };
  const currencySymbol = currenciesSymbols[selectedCurrency] || "";
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 50;
  const totalPages = 50;
  let coins = [];
  let errorFetching = false;

  try {
    coins = await getCoinsData(selectedCurrency, page, perPage);
  } catch (err) {
    console.error('Error fetching coin list:', err.message);
    errorFetching = true;
  }


  console.log(coins.map(coin => coin.name));
  console.log("Selected Currency:", selectedCurrency);

  res.render("home.ejs", { 
    coins,
    supportedCurrencies,
    selectedCurrency,
    currencySymbol,
    currentPage: page,
    perPage,
    totalPages,
    errorFetching
  });

});


app.get("/coins/:id", async (req, res) => {
  const selectedCurrency = req.query.currency || "usd";
  const currencySymbol = "$";
  const coinId = req.params.id;
  let coin = [];

  let chartLabels = [];
  let chartDataPoints = [];

  try {
    coin = await getCoinData(selectedCurrency, coinId);
    console.log(coin);

    const chartData = await generatePriceChart(selectedCurrency, coinId);

    chartLabels = chartData.prices.map(p => new Date(p[0]).toLocaleDateString());
    chartDataPoints = chartData.prices.map(p => p[1]);

  } catch (err) {
    console.error('Error fetching coin data:', err.message);
  }
  console.log(coin.map(coin => coin.image));

  res.render("coin.ejs", {
    coin: coin[0],
    selectedCurrency,
    currencySymbol,
    chartLabels,
    chartDataPoints
  });
});

// FOR SEARCH BAR
app.get("/api/coins", async (req, res) => {
  try {
    const coins = await getCoinsData("usd", 1, 250);
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch coins" });
  }
});



// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

