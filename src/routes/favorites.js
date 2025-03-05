const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({}, { strict: false });
const Favorites = mongoose.model('favorites', favoritesSchema, 'favorites');

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorites.find();
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const favorite = await Favorites.findById(req.params.id);
    if (!favorite)
      return res.status(404).json({ error: 'Favorito no encontrado' });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newFavorite = new Favorites(req.body);
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedFavorite = await Favorites.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedFavorite)
      return res.status(404).json({ error: 'Favorito no encontrado' });
    res.json(updatedFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFavorite = await Favorites.findByIdAndDelete(req.params.id);
    if (!deletedFavorite)
      return res.status(404).json({ error: 'Favorito no encontrado' });
    res.json({ message: 'Favorito eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
