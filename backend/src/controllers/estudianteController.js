const Estudiante = require('../models/Estudiante');
const bcrypt = require('bcryptjs');

exports.createEstudiante = async (req, res) => {
  try {
    const { nombres, apellidos, documento_identidad, correo_electronico, numero_telefono, usuario, contrasena } = req.body;

    exports.createEstudiante = async (req, res) => {
  try {
    const { nombres, apellidos, documento_identidad, correo_electronico, numero_telefono, usuario, contrasena } = req.body;

    // Validaciones adicionales
    if (!nombres || !apellidos || !documento_identidad || !correo_electronico || !numero_telefono || !usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoEstudiante = await Estudiante.create({
      nombres,
      apellidos,
      documento_identidad,
      correo_electronico,
      numero_telefono,
      usuario,
      contrasena: hashedPassword
    });

    res.status(201).json({ mensaje: 'Estudiante registrado exitosamente', estudiante: nuevoEstudiante });
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    res.status(400).json({ error: 'Validation error' });
  }
};

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const nuevoEstudiante = await Estudiante.create({
      nombres,
      apellidos,
      documento_identidad,
      correo_electronico,
      numero_telefono,
      usuario,
      contrasena: hashedPassword
    });

    res.status(201).json({ mensaje: 'Estudiante registrado exitosamente', estudiante: nuevoEstudiante });
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
    res.status(400).json({ error: 'Validation error' });
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
