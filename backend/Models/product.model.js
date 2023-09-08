const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  offer: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  original: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
