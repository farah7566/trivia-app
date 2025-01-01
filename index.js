require('dotenv').config(); // Load environment variables
const express = require('express');
const axios = require('axios');
const { Pool } = require('pg'); // Import pg for PostgreSQL
const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

// API route to fetch trivia questions based on selected difficulty
app.get('/trivia', async (req, res) => {
  const difficulty = req.query.difficulty || 'easy';
  const url = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${difficulty}`;

  try {
    const response = await axios.get(url);
    const triviaQuestions = response.data.results;

    // Save questions to the database
    const client = await pool.connect();
    try {
      for (const question of triviaQuestions) {
        await client.query(
          'INSERT INTO trivia_questions (question, correct_answer, difficulty) VALUES ($1, $2, $3)',
          [question.question, question.correct_answer, difficulty]
        );
      }
    } finally {
      client.release();
    }

    res.json(triviaQuestions);
  } catch (error) {
    console.error('Error fetching trivia data:', error);
    res.status(500).send('Unable to fetch trivia questions');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
