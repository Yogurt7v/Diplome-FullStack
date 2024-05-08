const Busket = require("../models/Busket");

async function getBusket() {
    const busket = await Busket.find();
    return busket;
}

async function getBusketById(id) {
    const busket = await Busket.find({ userId: id });
    return busket;
}

async function addBusket(busket) {
    console.log("addBusket");
    const newBusket = new Busket(busket);
    await newBusket.save();
    return newBusket;
}

async function deleteBusket(id) {
    console.log("deleteBusket", id);
    await Busket.deleteOne({ _id: id });
}

async function updateBusket(id, busket) {
    console.log("updateBusket");
    const updatedBusket = await Busket.findByIdAndUpdate(id, busket);
    return updatedBusket;
}


module.exports = { getBusket, addBusket, deleteBusket, updateBusket, getBusketById }