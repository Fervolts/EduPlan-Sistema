const bcrypt = require('bcryptjs');
const Administrador = require('../models/Administrador');

exports.createAdministrador = async (req, res) => {
  try {
    // Extraer campos del cuerpo de la solicitud
    const { nombre, usuario, contrasena } = req.body;

    // Validaciones adicionales
    if (!nombre || !usuario || !contrasena) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validación de longitud de la contraseña
    if (contrasena.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo administrador
    const nuevoAdministrador = await Administrador.create({
      nombre,
      usuario,
      contrasena: hashedPassword
    });

    // Enviar respuesta exitosa
    res.status(201).json({ mensaje: 'Administrador registrado exitosamente', administrador: nuevoAdministrador });
  } catch (error) {
    console.error('Error al registrar administrador:', error);
    res.status(500).json({ error: 'Error al registrar administrador' });
  }
};

exports.getAdministradores = async (req, res) => {
  try {
    const administradores = await Administrador.findAll();
    res.status(200).json(administradores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};