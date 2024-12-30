const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// API route to fetch trivia questions based on selected difficulty
app.get('/trivia', async (req, res) => {
  // Get the difficulty from query parameters (default to 'easy')
  const difficulty = req.query.difficulty || 'easy';
  const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching trivia data:', error);
    res.status(500).send('Unable to fetch trivia questions');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});