# Crypto Coin Listing Web App

A web app that lists cryptocurrencies with real-time data using the CoinGecko API. Users can view information about the coins, including prices, market cap, 24h volume, and more. It features pagination, custom display options, and a responsive table.

## Project Overview

This web application displays a table of cryptocurrency data fetched from the **CoinGecko API**. It provides a user-friendly interface with a responsive design, featuring a customizable number of coins per page (25, 50, 100, or 200), pagination to navigate through multiple pages, and clickable rows that link to detailed coin pages.

### Key Features

- **Dynamic Coin List**: Displays the top coins sorted by market cap with information such as price, volume, market cap, and 24h percentage change.
- **Responsive Design**: Fully responsive layout that adapts to different screen sizes, optimized for both mobile and desktop views.
- **Pagination**: Pagination to navigate through the pages of coins, with the ability to choose how many coins are displayed per page (25, 50, 100, or 200).
- **Clickable Coin Rows**: The entire row for each coin is clickable, redirecting to a separate page with detailed information about the selected coin.
- **Error Handling**: Graceful error handling for API fetch failures, showing an error message instead of breaking the page layout.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS (Bootstrap), EJS (Embedded JavaScript Templates)
- **API**: CoinGecko API
- **Styling**: Bootstrap for layout and responsive design

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (includes npm)
- [Express](https://expressjs.com/)
- [EJS](https://www.npmjs.com/package/ejs)

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>
