const UsuarioRol = require('../models/UsuarioRol');
const Estudiante = require('../models/Estudiante');
const Profesor = require('../models/Profesor');
const Administrador = require('../models/Administrador');
const Rol = require('../models/Rol');

exports.createUsuarioRol = async (req, res) => {
  try {
    const usuarioRol = await UsuarioRol.create(req.body);
    res.status(201).json(usuarioRol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsuariosRoles = async (req, res) => {
  try {
    const usuariosRoles = await UsuarioRol.findAll({
      include: [Estudiante, Profesor, Administrador, Rol],
    });
    res.status(200).json(usuariosRoles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
