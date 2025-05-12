searchInput.addEventListener("input", e => {
    const value = e.target.value
    console.log(value)
})



document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const rows = document.querySelectorAll(".coin-row");

    searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();

        rows.forEach(row => {
            const tds = row.querySelectorAll('td');
            const coinName = tds[1]?.textContent.toLowerCase() || "";
            row.style.display = coinName.includes(query) ? "" : "none";
        });
    });
});
