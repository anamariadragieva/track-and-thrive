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
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 50;
  const totalPages = 3;
  let coins = [];
  let errorFetching = false;

  try {
    const result = await axios.get(COINGECKO_API_URL + "/coins/markets" , {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: perPage,
        page,
      }
    });
    coins = result.data;

  } catch (err) {
    console.error('Error fetching coin list:', err.message);
    errorFetching = true;
  }

  res.render("home.ejs", {
    coins,
    currentPage: page,
    perPage,
    totalPages,
    errorFetching: errorFetching || false
  });
});

app.get("/coins/:id", async (req, res) => {
  const coinId = req.params.id;
  console.log(coinId);

  try {
    const result = await axios.get(`${COINGECKO_API_URL}/coins/${coinId}`);
    const coin = result.data;
    console.log(coin);
    res.render("coin.ejs", { coin });

  } catch (err) {
    console.error('Error fetching coin data:', err.message);

  }

});



// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

