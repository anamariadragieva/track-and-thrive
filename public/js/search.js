// search.js
import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm';

function addSearchResult(coin) {

  const isPositive = coin.price_change_percentage_24h >= 0;
  const priceChange = isPositive ? "text-success" : "text-danger";
  const cadetIcon = isPositive ? "bi-caret-up-fill" : "bi-caret-down-fill";

  return `<li class="list-group-item">
            <a href="/coins/${coin.id}" class="d-flex align-items-center gap-3 text-decoration-none text-dark w-100 h-100">
              <img src="${coin.image}" class="img-fluid" style="max-width: 26px;" alt="coin logo">
              <span class="fw-medium text-start">${coin.name}</span>
              <span class="text-muted">${coin.symbol.toUpperCase()}</span>
        
              
              <span class="ms-auto text-end fw-light ${priceChange}">
                <i class="bi ${cadetIcon} fa-xs"></i>
                ${coin.price_change_percentage_24h.toFixed(2)} % (1d)
              </span>
            </a>
          </li>`;
}

$(document).ready(function () {
  let coinsList = [];

  async function getCoinsList(params) {
    try {
      const response = await axios.get("/api/coins")
      coinsList = response.data;
      console.log(coinsList);
    } catch (err) {
      console.error("Error fetching coins.", err);
    }  
  }

  getCoinsList();

  $("#search").on("input", function () {
    console.log("input detected");

    const searchTerm = $(this).val().toLowerCase();
    console.log(searchTerm);

    const results = $("#search-results");
    
    results.empty();
    console.log(results);

    if (searchTerm.length === 0) return;

    const filtered = coinsList.filter(coin => 
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
    ).slice(0, 10);

    if (filtered.length === 0) {
      results.append(`<li class="list-group-item">No results found.</li>`);
      return;
    }

    filtered.forEach(coin => {
      results.append(addSearchResult(coin));
    });

  
  });
});
