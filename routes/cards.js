const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const cardsPath = path.join(__dirname, '..', 'data', 'cards.json');

// GET /cards
router.get('/', (req, res) => {
  fs.readFile(cardsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error leyendo archivo de tarjetas' });
      return;
    }

    const cards = JSON.parse(data);
    res.json(cards);
  });
});

module.exports = router;

