const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const DiplomOrderSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  paid: {
    type: Boolean,
    required: true,
    default: false,
  },
  items: [
    itemsSchema
  ],
  publishedAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const Order = mongoose.model("order", DiplomOrderSchema);

module.exports = Order;
