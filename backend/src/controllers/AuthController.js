const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Estudiante = require('../models/estudiante')
const Profesor = require('../models/profesor')
const Administrador = require('../models/administrador')


// Función para manejar el inicio de sesión
exports.login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    let user = await Estudiante.findOne({ where: { usuario } });
    if (!user) {
      user = await Profesor.findOne({ where: { usuario } });
    }
    if (!user) {
      user = await Administrador.findOne({ where: { usuario } });
    }

    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(contrasena, user.contrasena);
    if (!isMatch) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user.id, tipo: user.constructor.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};

// Función para manejar el registro de nuevos usuarios
exports.register = async (req, res) => {
  const { usuario, contrasena, tipo, ...resto } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    let user;
    if (tipo === 'Estudiante') {
      user = await Estudiante.create({ usuario, contrasena: hashedPassword, ...resto });
    } else if (tipo === 'Profesor') {
      user = await Profesor.create({ usuario, contrasena: hashedPassword, ...resto });
    } else if (tipo === 'Administrador') {
      user = await Administrador.create({ usuario, contrasena: hashedPassword, ...resto });
    } else {
      return res.status(400).json({ message: 'Tipo de usuario no válido' });
    }

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro' });
  }
};