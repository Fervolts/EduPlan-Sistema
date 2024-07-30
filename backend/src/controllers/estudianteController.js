const Estudiante = require('../models/Estudiante');
const Materia = require('../models/Materia');
const bcrypt = require('bcryptjs');
const EstudianteMateria = require('../models/EstudianteMateria');

exports.createEstudiante = async (req, res) => {
  try {
    const { nombres, apellidos, documento_identidad, correo_electronico, numero_telefono, usuario, contrasena, materias } = req.body;

    // Validaciones adicionales
    if (!nombres || !apellidos || !documento_identidad || !correo_electronico || !numero_telefono || !usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (materias.length > 5) {
      return res.status(400).json({ error: 'No puedes seleccionar más de 5 materias.' });
    }

    // Validar que el usuario y el documento de identidad sean únicos
    const existingEstudiante = await Estudiante.findOne({ where: { documento_identidad } });
    if (existingEstudiante) {
      return res.status(400).json({ error: 'El documento de identidad ya está en uso' });
    }

    const existingUser = await Estudiante.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo estudiante
    const nuevoEstudiante = await Estudiante.create({
      nombres,
      apellidos,
      documento_identidad,
      correo_electronico,
      numero_telefono,
      usuario,
      contrasena: hashedPassword
    });

    // Asignar materias al nuevo estudiante
    const entries = materias.map(materiaId => ({ id_estudiante: nuevoEstudiante.id, id_materia: materiaId }));
    await EstudianteMateria.bulkCreate(entries);

    res.status(201).json({ mensaje: 'Estudiante registrado exitosamente', estudiante: nuevoEstudiante });
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    res.status(500).json({ error: 'Error al registrar estudiante', detalles: error });
  }
};
  
  exports.getEstudiantes = async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll();
      res.status(200).json(estudiantes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteEstudiante = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si el estudiante existe
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
  
      // Eliminar el estudiante
      await estudiante.destroy();
      res.status(200).json({ mensaje: 'Estudiante eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      res.status(400).json({ error: 'Error al eliminar el estudiante' });
    }
  };

exports.asignarMateriasEstu = async (req, res) => {
  const { id } = req.params;
  const { materias } = req.body;

  if (materias.length > 5) {
    return res.status(400).json({ message: 'No puedes seleccionar más de 5 materias.' });
  }

  try {
    const entries = materias.map(materiaId => ({ id_estudiante: id, id_materia: materiaId }));
    await EstudianteMateria.bulkCreate(entries);
    res.status(201).json({ message: 'Materias asignadas correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar materias.', error });
  }
};

exports.obtenerMateriasEstu = async (req, res) => {
  const { id } = req.params;
  try {
    const materias = await Materia.findAll({
      include: [{
        model: Estudiante,
        attributes: ['nombres', 'apellidos', 'documento_identidad'], // Ajusta según los atributos del modelo Estudiante
        through: { attributes: [] },
        where: { id_estudiante: id }
      }],
      attributes: ['id_materia', 'nombre_materia'] // Ajusta según los atributos del modelo Materia
    });
    res.json(materias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener materias.', error });
  }
};
