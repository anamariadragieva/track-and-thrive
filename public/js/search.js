import axios from "axios";

import axios from "axios"; // Make sure you're using a bundler like Vite, Webpack, etc., or use CDN version if not.

$(document).ready(function () {
  $("#search").on("input", async function () {
    const searchTerm = $(this).val().toLowerCase();
    const $results = $("#searchResults");
    $results.empty();

    if (searchTerm.length === 0) return;

    try {
      const response = await axios.get("/api/coins");
      const coins = response.data;

      const filtered = coins.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm)
      ).slice(0, 10);

      if (filtered.length === 0) {
        $results.append(`<li class="list-group-item">No results found.</li>`);
        return;
      }

      filtered.forEach(coin => {
        const item = `<li class="list-group-item">${coin.name}</li>`;
        $results.append(item);
      });

    } catch (err) {
      console.error("Search error:", err);
      $results.append(`<li class="list-group-item">Error fetching data.</li>`);
    }
  });
});
