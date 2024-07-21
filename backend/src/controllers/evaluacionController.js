const Evaluacion = require('../models/Evaluacion');
const Materia = require('../models/Materia');

exports.createEvaluacion = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.create(req.body);
    res.status(201).json(evaluacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll({
      include: [Materia],
    });
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
