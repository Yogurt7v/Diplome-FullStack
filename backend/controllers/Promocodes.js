const Promocode = require("../models/Promocode.js");

async function getPromocodes() {
    const count = await Promocode.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const promocodes = await Promocode.find().skip(randomIndex).limit(1);
    const promocode = promocodes[0];
    return promocode
}

async function checkPromocode(promocode) {
    const promo = await Promocode.findOne({ code: promocode });
    return promo
}



module.exports = { getPromocodes, checkPromocode }