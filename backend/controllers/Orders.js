const Order = require("../models/Product.js");

async function getOrders() {
    const orders = await Order.find();
    return orders;
}


module.exports = { getOrders }