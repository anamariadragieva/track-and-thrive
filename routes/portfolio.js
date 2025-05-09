// routes/portfolio.js
const express = require('express');
const router = express.Router();

// Define route for the portfolio page
router.get('/', (req, res) => {
  res.render('portfolio');  // Render portfolio view when someone visits '/portfolio'
});

module.exports = router;
