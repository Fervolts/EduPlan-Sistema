const ProfesorMateria = require('../models/ProfesorMateria');
const Materia = require('../models/Materia');
const Profesor = require ('../models/Profesor')

exports.asignarMaterias = async (req, res) => {
  const { id } = req.params;
  const { materias } = req.body;

  if (materias.length > 5) {
    return res.status(400).json({ message: 'No puedes seleccionar más de 5 materias.' });
  }

  try {
    const entries = materias.map(materiaId => ({ id_profesor: id, id_materia: materiaId }));
    await ProfesorMateria.bulkCreate(entries);
    res.status(201).json({ message: 'Materias asignadas correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar materias.', error });
  }
};

exports.obtenerMaterias = async (req, res) => {
  const { id } = req.params;
  try {
    const materias = await Materia.findAll({
      include: [{
        model: ProfesorMateria,
        attributes: [], // Omite los atributos de la tabla intermedia si no son necesarios
        where: { id_profesor: id }
      }],
      attributes: ['id_materia', 'nombre_materia'],
      include: [{
        model: Profesor,
        attributes: ['nombres', 'apellidos', 'usuario'] // Ajusta según los atributos del modelo Profesor
      }]
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materias.', error });
  }
};
