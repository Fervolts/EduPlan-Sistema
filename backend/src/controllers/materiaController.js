const Materia = require('../models/Materia');

exports.createMateria = async (req, res) => {
  try {
    const materia = await Materia.create(req.body);
    res.status(201).json(materia);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.status(200).json(materias);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
