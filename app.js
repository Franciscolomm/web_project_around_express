const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

/* ========================
   MIDDLEWARES (SIEMPRE ARRIBA)
   ======================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* ========================
   RUTAS
   ======================== */
app.use('/users', usersRouter);

/* ========================
   CONEXIÓN A MONGODB
   ======================== */
mongoose.connect('mongodb://127.0.0.1:27017/aroundb')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.error('Error de conexión a MongoDB:', err);
  });

/* ========================
   SERVIDOR
   ======================== */
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


