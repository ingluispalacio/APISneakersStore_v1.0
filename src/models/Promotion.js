const { Schema, model } = require('mongoose');

const promotionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productName: { type: String, required: true },
  specialPrice: { type: Number, required: true }
},
{
  timestamps: true,
  versionKey: false
});

const Promotion = model('Promotion', promotionSchema);

module.exports = Promotion;