const Administrador = require('../models/administrador');

exports.getAllAdmin = async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.json(administradores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener administradores' });
  }
};

exports.getByIdAdmin = async (req, res) => {
  try {
    const administrador = await Administrador.findByPk(req.params.id);
    if (administrador) {
      res.json(administrador);
    } else {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener administrador' });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const administrador = await Administrador.create(req.body);
    res.status(201).json(administrador);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear administrador' });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const [updated] = await Administrador.update(req.body, {
      where: { id_administrador: req.params.id },
    });
    if (updated) {
      const updatedAdministrador = await Administrador.findByPk(req.params.id);
      res.json(updatedAdministrador);
    } else {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar administrador' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await Administrador.destroy({
      where: { id_administrador: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Administrador no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar administrador' });
  }
};
