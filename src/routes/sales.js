const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({}, { strict: false });
const Sales = mongoose.model('sales', salesSchema, 'sales');

router.get('/', async (req, res) => {
  try {
    const sales = await Sales.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (!sale)
      return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newSale = new Sales(req.body);
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedSale = await Sales.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedSale)
      return res.status(404).json({ error: 'Venta no encontrada' });
    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedSale = await Sales.findByIdAndDelete(req.params.id);
    if (!deletedSale)
      return res.status(404).json({ error: 'Venta no encontrada' });
    res.json({ message: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
