const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: Number, require: true },
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  image: { type: String },
  id: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },

  properties: {
    color: { type: String },
    size: [
      {
        size: { type: String },
        quantity: { type: Number },
      },
    ],
    quantity: { type: Number },
    season: { type: String },
    fabric: { type: String },
    fit: { type: String },
    style: { type: String },
    material: { type: String },
    totalStock: { type: Number },
    batteryLife: { type: String },
    capacity: { type: String },
    connectivity: { type: String },
    features: [{ type: String }],
    screenSize: { type: String },
    specs: [{ type: String }],
  },

  category: {
    type: String,
    enum: ['electronics', 'jewelry', "men's clothing", "women's clothing"],
  },

  type: {
    type: String,
    enum: ['composite', 'simple'],
  },
});
module.exports = mongoose.model('Product', productSchema);
