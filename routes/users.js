const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

// GET /users
router.get('/', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error leyendo archivo de usuarios' });
      return;
    }

    const users = JSON.parse(data);
    res.json(users);
  });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  fs.readFile(usersPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error leyendo archivo de usuarios' });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (!user) {
      res.status(404).json({ message: 'ID de usuario no encontrado' });
      return;
    }

    res.json(user);
  });
});

module.exports = router;

