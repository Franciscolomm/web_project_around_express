const express = require('express');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});

