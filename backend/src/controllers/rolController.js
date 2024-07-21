const Rol = require('../models/Rol');

exports.createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
