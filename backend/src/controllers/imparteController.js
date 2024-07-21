const Imparte = require('../models/imparte');

exports.getAllimp = async (req, res) => {
  try {
    const imparte = await Imparte.findAll();
    res.json(imparte);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos de profesores que imparten materias' });
  }
};

exports.getByIdimp = async (req, res) => {
  try {
    const imparte = await Imparte.findByPk(req.params.id);
    if (imparte) {
      res.json(imparte);
    } else {
      res.status(404).json({ message: 'Registro de impartición no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener registro de impartición' });
  }
};

exports.createimp = async (req, res) => {
  try {
    const imparte = await Imparte.create(req.body);
    res.status(201).json(imparte);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear registro de impartición' });
  }
};

exports.deleteimp = async (req, res) => {
  try {
    const deleted = await Imparte.destroy({
      where: { id_imparte: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Registro de impartición no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar registro de impartición' });
  }
};
