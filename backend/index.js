const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors'); // Import CORS middleware

const app = express();
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

const pool = mysql.createPool({
  host: 'db', // Hostname of the MariaDB container in Docker Compose
  user: 'root',
  password: 'password',
  database: 'students_db'
});

app.post('/api/students', async (req, res) => {
  try {
    const { name, age } = req.body;
    const connection = await pool.getConnection();
    await connection.execute('INSERT INTO students (name, age) VALUES (?, ?)', [name, age]);
    connection.release();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while adding the student' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM students');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred while retrieving students' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
