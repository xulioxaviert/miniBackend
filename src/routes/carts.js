const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({}, { strict: false });
const Carts = mongoose.model('carts', cartsSchema, 'carts');

router.get('/', async (req, res) => {
  try {
    const carts = await Carts.find();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carts = await Carts.findById(req.params.id);
    if (!carts)
      return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = new Carts(req.body);
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedCart)
      return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCart = await Carts.findByIdAndDelete(req.params.id);
    if (!deletedCart)
      return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json({ message: 'Carrito eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
