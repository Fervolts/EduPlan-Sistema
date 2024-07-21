const Estudiante = require('../models/estudiante');

exports.getAllEstudi = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiantes' });
  }
};

exports.getByIdEstudi = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiante' });
  }
};

exports.createEstudi = async (req, res) => {
  try {
    const estudiante = await Estudiante.create(req.body);
    res.status(201).json(estudiante);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear estudiante' });
  }
};

exports.updateEstudi = async (req, res) => {
  try {
    const [updated] = await Estudiante.update(req.body, {
      where: { id_estudiante: req.params.id },
    });
    if (updated) {
      const updatedEstudiante = await Estudiante.findByPk(req.params.id);
      res.json(updatedEstudiante);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estudiante' });
  }
};

exports.deleteEstudi = async (req, res) => {
  try {
    const deleted = await Estudiante.destroy({
      where: { id_estudiante: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar estudiante' });
  }
};
