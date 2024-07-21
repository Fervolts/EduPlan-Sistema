const Imparte = require('../models/Imparte');
const Profesor = require('../models/Profesor');
const Materia = require('../models/Materia');

exports.createImparte = async (req, res) => {
  try {
    const imparte = await Imparte.create(req.body);
    res.status(201).json(imparte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getImparte = async (req, res) => {
  try {
    const imparte = await Imparte.findAll({
      include: [Profesor, Materia],
    });
    res.status(200).json(imparte);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
