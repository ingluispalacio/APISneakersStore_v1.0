const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true }
},
{
  timestamps: true,
  versionKey: false
});

const Product = model('Product', productSchema);

module.exports = Product;