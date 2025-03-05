const express = require('express');
const Product = require('./../models/Products');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const { title, price, description, stock, imageUrl } = req.body;
    const newProduct = new Product({
      title,
      price,
      description,
      stock,
      imageUrl,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

module.exports = router;
