const Inscripcion = require('../models/inscripcion');

exports.getAllIns = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inscripciones' });
  }
};

exports.getByIdIns = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id);
    if (inscripcion) {
      res.json(inscripcion);
    } else {
      res.status(404).json({ message: 'Inscripción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener inscripción' });
  }
};

exports.createIns = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.create(req.body);
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear inscripción' });
  }
};

exports.deleteIns = async (req, res) => {
  try {
    const deleted = await Inscripcion.destroy({
      where: { id_inscripcion: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Inscripción no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar inscripción' });
  }
};
