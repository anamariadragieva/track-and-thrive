document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("priceChart");
  if (!ctx || typeof chartLabels === "undefined" || typeof chartDataPoints === "undefined") {
    console.warn("Chart data missing or canvas not found.");
    return;
  }

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: "Price",
        data: chartDataPoints,
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            autoSkipPadding: 30
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
});

    // chartLabels = chartData.prices.map(p => 
    //   new Date(p[0]).toLocaleDateString("en-GB", {
    //     day: "numeric",
    //     month: "short"
    //   })
    // );