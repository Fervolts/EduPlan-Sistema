const Evaluacion = require('../models/Evaluacion');
const Materia = require('../models/Materia');

// Función para crear una evaluación
exports.createEvaluacion = async (req, res) => {
  try {
    const { id_materia, fecha_limite, porcentaje_calificacion, descripcion, calificacion } = req.body;

    // Validaciones adicionales
    if (!id_materia || !fecha_limite || !porcentaje_calificacion || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos excepto calificacion son obligatorios' });
    }

    // Crear la evaluación
    const evaluacion = await Evaluacion.create({
      id_materia,
      fecha_limite,
      porcentaje_calificacion,
      descripcion,
      calificacion
    });

    res.status(201).json(evaluacion);
  } catch (error) {
    console.error('Error al registrar evaluación:', error);
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


exports.updateEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_materia, fecha_limite, porcentaje_calificacion, descripcion, calificacion } = req.body;

    // Validaciones adicionales
    if (!id_materia || !fecha_limite || !porcentaje_calificacion || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos excepto calificacion son obligatorios' });
    }

    // Buscar la evaluación a actualizar
    const evaluacion = await Evaluacion.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    // Actualizar la evaluación
    const evaluacionActualizada = await evaluacion.update({
      id_materia,
      fecha_limite,
      porcentaje_calificacion,
      descripcion,
      calificacion
    });

    res.status(200).json({ mensaje: 'Evaluación actualizada exitosamente', evaluacion: evaluacionActualizada });
  } catch (error) {
    console.error('Error al actualizar evaluación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para eliminar una evaluación por ID
exports.deleteEvaluacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la evaluación a eliminar
    const evaluacion = await Evaluacion.findByPk(id);
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    // Eliminar la evaluación
    await evaluacion.destroy();
    res.status(200).json({ mensaje: 'Evaluación eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar evaluación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
