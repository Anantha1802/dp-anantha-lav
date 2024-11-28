const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // or you can use pg-promise

const app = express();
const port = 5000;

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'visys_dev', // replace with your db username
  host: '13.232.172.19', // or your database host
  database: 'devdb',
  password: 'dev@123', // replace with your db password
  port: 5432, // default PostgreSQL port
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to save user data
app.post('/submit', async (req, res) => {
  const { name, phone_number, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO test (name, phone_number, email) VALUES ($1, $2, $3) RETURNING *',
      [name, phone_number, email]
    );
    res.status(201).json({ message: 'User data saved!', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user data.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
