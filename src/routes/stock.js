const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({}, { strict: false });
const Stock = mongoose.model('stock', stockSchema, 'stock');

router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const stockEntry = await Stock.findById(req.params.id);
    if (!stockEntry)
      return res.status(404).json({ error: 'Registro de stock no encontrado' });
    res.json(stockEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedStock = await Stock.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedStock)
      return res.status(404).json({ error: 'Registro de stock no encontrado' });
    res.json(updatedStock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (!deletedStock)
      return res.status(404).json({ error: 'Registro de stock no encontrado' });
    res.json({ message: 'Registro de stock eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
