const Evaluacion = require('../models/Evaluacion');
const Materia = require('../models/Materia');
const Estudiante = require('../models/Estudiante')
const PDFDocument = require('pdfkit');
const EvaluacionEstudiante = require('../models/EvaluacionEstudiante')


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

// Función para obtener todas las evaluaciones
exports.getEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll({
      include: [Materia],
    });
    res.status(200).json(evaluaciones);
  } catch (error) {
    console.error('Error al obtener evaluaciones:', error);
    res.status(400).json({ error: error.message });
  }
};

// Función para actualizar una evaluación
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

// Función para subir un enlace de evaluación
exports.uploadEvaluacion = async (req, res) => {
  const { enlace } = req.body;
  const { id_evaluacion } = req.params;

  if (!enlace) {
    return res.status(400).json({ error: 'Enlace es obligatorio' });
  }

  try {
    const evaluacion = await Evaluacion.findByPk(id_evaluacion);
    if (!evaluacion) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    // Actualizar el enlace en la evaluación
    evaluacion.enlace = enlace;

    // Verificar si la evaluación está retrasada
    const fechaLimite = new Date(evaluacion.fecha_limite);
    const fechaActual = new Date();
    const estadoEvaluacion = fechaActual > fechaLimite ? 'completada con retraso' : 'completada';

    evaluacion.estado = estadoEvaluacion;
    await evaluacion.save();

    res.json(evaluacion);
  } catch (error) {
    console.error('Error al subir evaluación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Función para exportar notas por materia en un PDF
exports.exportarNotasPDF = async (req, res) => {
  try {
    const { id_materia } = req.params;

    if (!id_materia) {
      return res.status(400).json({ message: 'id_materia es requerido' });
    }

    // Obtener el nombre de la materia
    const materia = await Materia.findOne({
      where: { id_materia },
      attributes: ['nombre_materia']
    });

    if (!materia) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    const nombreMateria = materia.nombre_materia;

    // Obtener las evaluaciones de la materia, incluyendo los estudiantes y sus calificaciones
    const evaluaciones = await Evaluacion.findAll({
      where: { id_materia },
      include: [
        {
          model: Estudiante,
          attributes: ['nombres', 'apellidos', 'documento_identidad'],
          through: { attributes: ['calificacion'] } // Asegúrate que 'calificacion' esté en la tabla intermedia
        }
      ]
    });

    // Generar el PDF
    const doc = new PDFDocument();
    doc.fontSize(18).text(`Reporte de Calificaciones - ${nombreMateria}`, { align: 'center' });
    doc.moveDown();

    evaluaciones.forEach(evaluacion => {
      doc.fontSize(14).text(`Evaluación: ${evaluacion.descripcion}`);
      doc.moveDown();
      
    // Verifica si hay estudiantes asociados
    if (evaluacion.Estudiante && evaluacion.Estudiante.length > 0) {
      evaluacion.Estudiante.forEach(estudiante => {
        const calificacion = estudiante.EvaluacionEstudiante.calificacion;
        console.log(estudiante.EvaluacionEstudiante.calificacion)
        doc.fontSize(12).text(`Estudiante: ${estudiante.nombres} ${estudiante.apellidos} (ID: ${estudiante.documento_identidad})`);
        doc.text(`Calificación: ${calificacion !== null ? calificacion : 'No asignada'}`);
        doc.moveDown();
      });
    } else {
      doc.fontSize(12).text('No hay estudiantes asociados para esta evaluación.');
      doc.moveDown();
}


      doc.moveDown();
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=ReporteCalificaciones_${nombreMateria}.pdf`);
    
    doc.pipe(res);
    doc.end();
  } catch (error) {
    console.error('Error al exportar notas a PDF:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
