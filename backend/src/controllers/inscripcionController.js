const Inscripcion = require('../models/Inscripcion');
const Estudiante = require('../models/Estudiante');
const Materia = require('../models/Materia');

exports.createInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.create(req.body);
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [Estudiante, Materia],
    });
    res.status(200).json(inscripciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
