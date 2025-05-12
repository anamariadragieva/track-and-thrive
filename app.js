// index.js or app.js
import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from 'url';

// to access from .env
import dotenv from "dotenv";
import { error } from "console";
dotenv.config();
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

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 50;
  const totalPages = 3;
  let coins = [];
  let errorFetching = false;

  try {
    const result = await axios.get(COINGECKO_API_URL + "/coins/markets" , {
      params: {
        vs_currency: selectedCurrency,
        order: "market_cap_desc",
        per_page: perPage,
        page,
        sparkline: true
      }
    });

    // Process the result data
    coins = result.data.map(coin => {
        // Log the total volume for each coin
        console.log(`${coin.name} Total Volume:`, coin.total_volume);

        return {
            ...coin,  // Copy all existing properties from the coin object
            sparklineData: coin.sparkline_in_7d.price
        };
    });

    coins = result.data.map(coin => ({
      ...coin,  // Copy all existing properties from the coin object
      sparklineData: coin.sparkline_in_7d.price
    }));

  } catch (err) {
    console.error('Error fetching coin list:', err.message);
    errorFetching = true;
  }

  console.log(req.query.vs_currency);
  console.log(req.query);

  console.log("Selected Currency:", selectedCurrency);

  res.render("home.ejs", {
    supportedCurrencies,
    selectedCurrency,
    coins,
    currentPage: page,
    perPage,
    totalPages,
    errorFetching: errorFetching || false
  });
});

app.get("/coins/:id", async (req, res) => {
  const coinId = req.params.id;
  let coin = [];

  try {
    const result = await axios.get(`${COINGECKO_API_URL}/coins/markets` , {
      params: {
        vs_currency: "usd",
        ids: coinId
      }
    });

    coin = result.data;
    console.log(coin);
  } catch (err) {
    console.error('Error fetching coin data:', err.message);
  }

  res.render("coin.ejs", {
    coin: coin[0]

  });
});



// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

