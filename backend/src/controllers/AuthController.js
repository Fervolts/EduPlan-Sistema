const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Estudiante = require('../models/Estudiante');
const Profesor = require('../models/Profesor');
const Administrador = require('../models/Administrador');

exports.loginEstudiante = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const estudiante = await Estudiante.findOne({ where: { usuario } });

    if (estudiante && await bcrypt.compare(contrasena, estudiante.contrasena)) {
      const token = jwt.sign({ usuario: estudiante.usuario }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token, userId: estudiante.id_estudiante });
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginProfesor = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const profesor = await Profesor.findOne({ where: { usuario } });

    if (profesor && await bcrypt.compare(contrasena, profesor.contrasena)) {
      const token = jwt.sign({ usuario: profesor.usuario }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token, userId: profesor.id_profesor });
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginAdministrador = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;
    const administrador = await Administrador.findOne({ where: { usuario } });

    if (administrador && await bcrypt.compare(contrasena, administrador.contrasena)) {
      const token = jwt.sign({ usuario: administrador.usuario }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      res.status(200).json({ token, userId: administrador.id_administrador });
    } else {
      res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
