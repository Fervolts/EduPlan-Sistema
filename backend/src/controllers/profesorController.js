const Profesor = require('../models/Profesor');
const bcrypt = require('bcryptjs');

exports.createProfesor = async (req, res) => {
  try {
    const { nombres, apellidos, correo_electronico, usuario, contrasena } = req.body;

    // Validaciones adicionales
    if (!nombres || !apellidos || !correo_electronico || !usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar que el correo electrónico y el usuario sean únicos
    const existingProfesor = await Profesor.findOne({ where: { correo_electronico } });
    if (existingProfesor) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    const existingUser = await Profesor.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo profesor
    const nuevoProfesor = await Profesor.create({
      nombres,
      apellidos,
      correo_electronico,
      usuario,
      contrasena: hashedPassword
    });

    res.status(201).json({ mensaje: 'Profesor registrado exitosamente', profesor: nuevoProfesor });
  } catch (error) {
    console.error('Error al registrar profesor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
  exports.getProfesores = async (req, res) => {
    try {
      const profesores = await Profesor.findAll();
      res.status(200).json(profesores);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.deleteProfesor = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar si el profesor existe
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
      }
  
      // Eliminar el profesor
      await profesor.destroy();
      res.status(200).json({ mensaje: 'Profesor eliminado exitosamente' });
    } catch (error) {
      console.error('Error al eliminar profesor:', error);
      res.status(500).json({ error: 'Error al eliminar el profesor' });
    }
  };