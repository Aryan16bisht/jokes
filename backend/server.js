import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg'; 
const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'aryan', 
  host: 'localhost',
  database: 'jokes_db', 
  password: '', 
  port: 5432,
});

app.post('/api/favorite', async (req, res) => {
  const { joke_id, joke, image } = req.body;

  try {
    console.log(req.body);
    const result = await pool.query(
      'INSERT INTO favorites (joke_id, joke, image) VALUES ($1, $2, $3) RETURNING *',
      [joke_id, joke, image]
    );
    res.status(201).send(result.rows[0]); 
  } catch (error) {
    console.error('Error saving favorite joke:', error);
    res.status(500).send('Error saving favorite joke');
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM favorites'); 
    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching favorite jokes:', error);
    res.status(500).send('Error fetching favorite jokes');
  }
});

app.delete('/api/favorite', async (req, res) => {
  const { joke_id } = req.body; 

  try {
    const result = await pool.query(
      'DELETE FROM favorites WHERE joke_id = $1 RETURNING *',
      [joke_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).send('Favorite joke not found'); 
    }

    res.status(200).send('Favorite joke removed successfully'); 
  } catch (error) {
    console.error('Error removing favorite joke:', error);
    res.status(500).send('Error removing favorite joke');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});