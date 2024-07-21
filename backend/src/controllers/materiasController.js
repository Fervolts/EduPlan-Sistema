const Materia = require('../models/materia');

exports.getAllMate = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materias' });
  }
};

exports.getByIdMate = async (req, res) => {
  try {
    const materia = await Materia.findByPk(req.params.id);
    if (materia) {
      res.json(materia);
    } else {
      res.status(404).json({ message: 'Materia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materia' });
  }
};

exports.createMate = async (req, res) => {
  try {
    const materia = await Materia.create(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear materia' });
  }
};

exports.updateMate = async (req, res) => {
  try {
    const [updated] = await Materia.update(req.body, {
      where: { id_materia: req.params.id },
    });
    if (updated) {
      const updatedMateria = await Materia.findByPk(req.params.id);
      res.json(updatedMateria);
    } else {
      res.status(404).json({ message: 'Materia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar materia' });
  }
};

exports.deleteMate = async (req, res) => {
  try {
    const deleted = await Materia.destroy({
      where: { id_materia: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Materia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar materia' });
  }
};
