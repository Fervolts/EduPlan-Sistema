const Evaluacion = require('../models/evaluacion');

exports.getAllEva = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll();
    res.json(evaluaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener evaluaciones' });
  }
};

exports.getByIdEva = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.findByPk(req.params.id);
    if (evaluacion) {
      res.json(evaluacion);
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener evaluación' });
  }
};

exports.createEva = async (req, res) => {
  try {
    const evaluacion = await Evaluacion.create(req.body);
    res.status(201).json(evaluacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear evaluación' });
  }
};

exports.updateEva = async (req, res) => {
  try {
    const [updated] = await Evaluacion.update(req.body, {
      where: { id_evaluacion: req.params.id },
    });
    if (updated) {
      const updatedEvaluacion = await Evaluacion.findByPk(req.params.id);
      res.json(updatedEvaluacion);
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar evaluación' });
  }
};

exports.deleteEva = async (req, res) => {
  try {
    const deleted = await Evaluacion.destroy({
      where: { id_evaluacion: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar evaluación' });
  }
};
