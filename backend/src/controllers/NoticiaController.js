const Noticia = require('../models/Noticia');

// Create a new noticia
exports.createNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.create(req.body);
    res.status(201).json(noticia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all noticias
exports.getAllNoticias = async (req, res) => {
  try {
    const noticias = await Noticia.findAll();
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single noticia
exports.getNoticiaById = async (req, res) => {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia not found' });
    }
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a noticia
exports.updateNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia not found' });
    }
    await noticia.update(req.body);
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a noticia
exports.deleteNoticia = async (req, res) => {
  try {
    const noticia = await Noticia.findByPk(req.params.id);
    if (!noticia) {
      return res.status(404).json({ message: 'Noticia not found' });
    }
    await noticia.destroy();
    res.json({ message: 'Noticia deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};