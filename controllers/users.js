const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Error del servidor' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Usuario no encontrado' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'ID inválido' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};

module.exports.createUser = (req, res) => {
  console.log('BODY RECIBIDO:', req.body);

  if (!req.body) {
    return res.status(400).send({ message: 'Body vacío o mal enviado' });
  }

  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return res.status(400).send({ message: 'Faltan campos obligatorios' });
  }

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Datos inválidos' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Datos inválidos' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Usuario no encontrado' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Avatar inválido' });
      } else {
        res.status(500).send({ message: 'Error del servidor' });
      }
    });
};
