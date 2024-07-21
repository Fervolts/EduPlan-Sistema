const Rol = require('../models/rol');

exports.getAllRol = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};

exports.getByIdRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rol' });
  }
};

exports.createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol' });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const [updated] = await Rol.update(req.body, {
      where: { id_rol: req.params.id },
    });
    if (updated) {
      const updatedRol = await Rol.findByPk(req.params.id);
      res.json(updatedRol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    const deleted = await Rol.destroy({
      where: { id_rol: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
};
