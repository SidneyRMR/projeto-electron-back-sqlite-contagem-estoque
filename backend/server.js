const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

app.use(cors());
app.use(bodyParser.json());

app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

app.post('/produtos', (req, res) => {
  const { nome, quantidade } = req.body;
  db.run('INSERT INTO produtos (nome, quantidade) VALUES (?, ?)', [nome, quantidade], function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: {
        id: this.lastID,
        nome,
        quantidade,
      },
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
