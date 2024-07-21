const UsuarioRol = require('../models/usuarioRol');

exports.getAllUser = async (req, res) => {
  try {
    const usuariosRoles = await UsuarioRol.findAll();
    res.json(usuariosRoles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios roles' });
  }
};

exports.getByIdUser = async (req, res) => {
  try {
    const usuarioRol = await UsuarioRol.findByPk(req.params.id);
    if (usuarioRol) {
      res.json(usuarioRol);
    } else {
      res.status(404).json({ message: 'UsuarioRol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarioRol' });
  }
};

exports.createUser = async (req, res) => {
  try {
    const usuarioRol = await UsuarioRol.create(req.body);
    res.status(201).json(usuarioRol);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuarioRol' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await UsuarioRol.destroy({
      where: { id_usuario_rol: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'UsuarioRol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuarioRol' });
  }
};
