// routes/home.js
const express = require('express');
const router = express.Router();

// Define route for the home page
router.get('/', (req, res) => {
  res.render('home');  // Render the 'home' view when someone visits '/'
});

module.exports = router;
