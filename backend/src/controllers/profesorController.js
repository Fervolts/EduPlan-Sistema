const Profesor = require('../models/profesor');

exports.getAllProf = async (req, res) => {
  try {
    const profesores = await Profesor.findAll();
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener profesores' });
  }
};

exports.getByIdProf = async (req, res) => {
  try {
    const profesor = await Profesor.findByPk(req.params.id);
    if (profesor) {
      res.json(profesor);
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener profesor' });
  }
};

exports.createProf = async (req, res) => {
  try {
    const profesor = await Profesor.create(req.body);
    res.status(201).json(profesor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear profesor' });
  }
};

exports.updateProf = async (req, res) => {
  try {
    const [updated] = await Profesor.update(req.body, {
      where: { id_profesor: req.params.id },
    });
    if (updated) {
      const updatedProfesor = await Profesor.findByPk(req.params.id);
      res.json(updatedProfesor);
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar profesor' });
  }
};

exports.deleteProf = async (req, res) => {
  try {
    const deleted = await Profesor.destroy({
      where: { id_profesor: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Profesor no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar profesor' });
  }
};
