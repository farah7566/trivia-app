const express = require('express');
const axios = require('axios');
const { Client } = require('pg');  // Import PostgreSQL client
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Set up express to parse JSON
app.use(express.json());
app.use(express.static('public'));

// Connect to the PostgreSQL database
const dbClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'trivia_users',
  password: 'Ffaarraahh222004*', // Replace with your password
  port: 5432,
});

dbClient.connect();

// API route to handle login
app.post('/login', async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the username already exists in the database
    const result = await dbClient.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      // If user exists, proceed
      res.json({ success: true });
    } else {
      // If user doesn't exist, insert a new user
      await dbClient.query('INSERT INTO users (username) VALUES ($1)', [username]);
      res.json({ success: true });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false });
  }
});

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
